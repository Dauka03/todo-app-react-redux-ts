import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { addTaskToProject, changeTaskInProject, fetchProject } from "../store/action-creators/project";
import { addTask, changeStatus } from "../store/action-creators/task";
import { Column } from "./Column";
import "@fontsource/anek-telugu";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import * as _ from "radash";
import { TaskState } from "../types/tasks";
import { Button } from "@mui/material";


const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const task = useTypedSelector((state) => state.task);
  const project = useTypedSelector((state) => state.project);
  const [projectToAdd, setProjectToAdd] = useState("");
  const { id } = useParams();
  const COLUMNS = ["queue", "development", "done"];
  const DEFAULT_COLUMN = "Queue";
  const [data, setData] = useState<TaskState[]>(project.tasks);
  const [searchedItem, setSearchedItem]: any = useState();
  const handleOnDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const elementId = active.id;
      const deepCopy = [...data];

      const updatedState = deepCopy.map((elm): TaskState => {
        if (elm.id === elementId) {
          const currentStatus = over?.id ? String(over.id) : elm.currentStatus;
          // console.log(currentStatus);
          dispatch(changeStatus(currentStatus, elm.id));
          return { ...elm, currentStatus };
        }
        return elm;
      });
      // dispatch to project new updated data and use in component as state
      dispatch(changeTaskInProject(updatedState, id));
    },
    [data, setData]
  );
  useEffect(() => {
    if (task.description == null) {
      dispatch(addTaskToProject(task, id));
    }
    dispatch(fetchProject(id));
  }, [task]);
  useEffect(() => {
    setData(project.tasks);
  }, [project]);

  const handleChangeItem = (event: any) => {
    setProjectToAdd(event.target.value);
  };
  const handleSearchItem = (e: any) => {
    setSearchedItem(e.target.value);
  };

  const searchedItems = data.filter((item: any) =>
    item.title.includes(searchedItem)
  );
  // console.log(searchedItems);

  return (
    <>
      <DndContext onDragEnd={handleOnDragEnd}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            style={{ width: "250px", height: "25px" }}
            value={searchedItem}
            type="text"
            className="form-control search-input"
            placeholder="type to search"
            onChange={handleSearchItem}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              style={{ width: "165px", height: "25px" }}
              value={projectToAdd}
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={handleChangeItem}
            ></input>
            <Button
              onClick={() => dispatch(addTask({ title: projectToAdd }))}
              size="small"
              variant="contained"
              color="success"
            >
              Add task
            </Button>
          </div>
        </div>

        <MainWrapper>
          {COLUMNS.map((column, columnIndex) =>
            _.isEmpty(searchedItems) ? (
              <Column
                key={`column-${columnIndex}`}
                heading={column}
                elements={_.select(
                  data,
                  (elm) => elm,
                  (f) => f.currentStatus === column
                )}
              />
            ) : (
              <Column
                key={`column-${columnIndex}`}
                heading={column}
                elements={_.select(
                  searchedItems,
                  (elm) => elm,
                  (f) => f.currentStatus === column
                )}
              />
            )
          )}
        </MainWrapper>
      </DndContext>
    </>
  );
}
const MainWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  backgroundColor: "#fff",
  paddingTop: 40,
  paddingBottom: 40,
  fontFamily: "Anek Telugu",
  height: "90vh",
});

export default TaskList;