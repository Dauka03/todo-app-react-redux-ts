// @/src/components/DraggableElement.tsx
import { FC, SetStateAction, useEffect, useMemo, useState } from "react";
import { styled } from "@stitches/react";

import { Draggable } from "./Draggable";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskState } from "../types/tasks";
import { useAppDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import { changeTaskInProject, deleteTaskFromProject, fetchProject } from "../store/action-creators/project";
import { changeTask, deleteTask } from "../store/action-creators/task";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface IDraggableElement {
  identifier: string;
  title: string;
}

export const DraggableElement: FC<IDraggableElement> = ({
  identifier,
}) => {
  const dispatch = useAppDispatch()
  const itemIdentifier = useMemo(() => identifier, [identifier]);
  const project = useTypedSelector(state=>state.project)
  const [data, setData] = useState<TaskState[]>(project.tasks);
  const {id} = useParams()
  const [open, setOpen] = useState(false);
  const task = data.filter((item)=>item.id===itemIdentifier)
  const [description, setDescription]:any = useState(task[0].description)
  const [title, setTitle] :any= useState(task[0].title)
  const [files, setFiles] :any = useState(task[0].files)
  const [comments, setComments]: any = useState(task[0].comments)
  const [comment, setComment]: any = useState("")

  const reader = new FileReader()

  const showEvent = (e:any)=>{
    let file = e.target.files[0]
    reader.readAsDataURL(file)
    setReader()
}
const setReader = () => {
  reader.onload = function () {
    setFiles([...files, reader.result]);
  };
};
const handleRemoveItem = ( key:any )=> {
  const removeArr = ([...files].filter(url => url !== key))
  setFiles(removeArr);
}
  const handleOpen = () => {
    setOpen(true); 
  }
  const handleClose = () => setOpen(false);

  useEffect(()=>{
    setData(project.tasks)   
},[project])

  const removeTask = (idTask: string) => {
    const removeArr = ([...data].filter(item => item.id !== idTask))
    dispatch(deleteTask(idTask))
    dispatch(deleteTaskFromProject(removeArr,id))    
  };  
  const saveTask = (idTask:any) =>{
    if(description==null){
      alert('Description is required')
    }
    else{
    const newArr = ([...data].map((item: TaskState)=>{
      if(item.id == idTask){
        
        const newTask = {...item, description,title,files,comments}
        // console.log(newTask);
        
        dispatch(changeTask(newTask, idTask))
        return {...item,description,title,files,comments};
      }
      return item
    }))
    // console.log(newArr);
    dispatch(changeTaskInProject(newArr, id))}
  }
  const handleChangeTitle = (event:any) => {
    setTitle(event.target.value);
    
  };
  const handleChangeComment = (event:any) => {
    setComment(event.target.value);
  };
  const saveToComments = () => {
    setComments([...comments,comment]);
  };
  const removeComment = (indexComm:any) => {
    const removeArr = ([...comments].filter((item,index) => index!==indexComm))
    setComments(removeArr);
  };
  return (
    <>
    <Draggable id={itemIdentifier}>
      <ElementWrapper>
        <ElementText>{task[0].title}</ElementText>
        <ElementText>{task[0].description}</ElementText>
        <ElementTime>
         created {task[0].timeAtWork} minutes ago
      </ElementTime>
      </ElementWrapper>
      
    </Draggable>

    <FlexEndItems>
      <DeletePlace >
        <Button onClick={handleOpen} size="small" variant="contained" color="success">
          Open task
            </Button>
          <IconButton onClick={()=>removeTask(itemIdentifier)} aria-label="delete" size="large">
            <DeleteIcon />
         </IconButton>
        </DeletePlace>
       </FlexEndItems>

          <Modal
        key={task[0].id}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <input 
            value={title}
          className="form-control"
          placeholder="Title"
          onChange={handleChangeTitle}></input>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description
          </Typography>
          
          <ReactQuill theme="snow" value={description} onChange={setDescription}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Upload file
          </Typography>
          <input
          type={"file"}
          id={"file"}
          multiple={true}
          onChange={showEvent}
          // accept={[".png", ".jpg", ".jpeg", ".gif"]}
        ></input>
        <div style={{display:'flex'}}>
          {files.length !== 0 ? (
            files.map((item:any) => (
              <div key={item} className="preview-image">
                <button onClick={()=>handleRemoveItem(item)}>
                    <img width={100} src={item}></img>
                </button>
              </div>
            ))
          ) : (
            <>No files</>
          )}
        </div>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Write comment
          </Typography>
          <ReactQuill theme="snow" value={comment} onChange={setComment}/>
          <button onClick={saveToComments}>Send comment</button>
          {comments.map((comm:any, index:any)=>(
            <div key={index} style={{display:'flex'}}>
             <Comment>{comm}</Comment>
             <IconButton onClick={()=>removeComment(index)} aria-label="delete" size="large">
            <DeleteIcon />
         </IconButton>
            </div>
          ))}
          <Button  onClick={()=> saveTask(task[0].id)} size="small" variant="contained" color="success">
          Save task
            </Button>
        </Box>
              </Modal>

    </>
    
  );
};

const ElementWrapper = styled("div", {
  background: "#f6f6f6",
  borderRadius: 10,
  height: 120,
  width: "100%",
  marginTop: 12,
});

const ElementText = styled("h3", {
  fontSize: 18,
  fontWeight: 600,
});

const ElementTime = styled("h6",{
  fontSize: 14,
  fontWeight: 500,
  overflow: 'scroll'
})
const DeletePlace = styled("div", {
  display: "flex",
  width: "100%",
  height: 120,
  alignItems: "center",
  justifyContent: "flex-end",
  
});

const FlexEndItems = styled("div",{
  alignItems: "flex-end"
})
const Comment = styled("div",{
  width: 300, /* Ширина блока */
  height: 50, /* Высота блока */
  padding: 5, /* Поля вокруг текста */
  border: 'solid 1px gray', /* Параметры рамки */
  marginBottom: 10
})
const style = {
  position: 'absolute',
  top: '10%',
  left: '20%',
  width: 800,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowX: 'hidden',
  overflowY: 'auto'
};

