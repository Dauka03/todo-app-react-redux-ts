import { Dispatch } from "redux";
import { TaskAction, TaskActionTypes, TaskState } from "../../types/tasks";

export const addTask = (proj: { title: string }) => {
  return (dispatch: Dispatch<TaskAction>) => {
    // const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    dispatch({
      type: TaskActionTypes.ADD_TASK,
      payload: {
        title: proj.title,
      },
    });
    // localStorage.setItem('projectss', JSON.stringify(response))
  };
};
export const changeStatus = (status: string | null, id: string | null) => {
  return (dispatch: Dispatch<TaskAction>) => {
    // const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    dispatch({
      type: TaskActionTypes.CHANGE_STATUS,
      payload: {
        id: id,
        currentStatus: status,
      },
    });
    // localStorage.setItem('projectss', JSON.stringify(response))
  };
};

export const changeTask = (task: TaskState, id: string | null) => {
  return (dispatch: Dispatch<TaskAction>) => {
    // const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    dispatch({
      type: TaskActionTypes.CHANGE_TASK,
      payload: {
        title: task.title,
        id: id,
        description: task.description,
      },
    });
    // localStorage.setItem('projectss', JSON.stringify(response))
  };
};

export const deleteTask = (id: string | null) => {
  return (dispatch: Dispatch<TaskAction>) => {
    // const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    dispatch({
      type: TaskActionTypes.DELETE_TASK,
      payload: {
        id: id,
      },
    });
    // localStorage.setItem('projectss', JSON.stringify(response))
  };
};

//   export const deleteProject = (uuid: string) =>{
//     return (dispatch: Dispatch<TaskAction>)=>{

//       const response = JSON.parse(localStorage.getItem("projectss") || "[]")
//       console.log(response);

//       const removeArr = ([...tasks].filter(item => item.id !== uuid))
//       console.log(removeArr);
//       localStorage.setItem('projectss', JSON.stringify(removeArr))
//       dispatch({
//         type: ProjectActionTypes.DELETE_PROJECT,
//         payload:{
//           id: uuid
//         }
//       })
//     }
//   }
