import { Dispatch } from "redux";
import {
  ProjectAction,
  ProjectActionTypes,
  ProjectState,
} from "../../types/project";
import { TaskAction, TaskState } from "../../types/tasks";

export const addProject = (proj: { name: string }) => {
  return (dispatch: Dispatch<ProjectAction>) => {
    // const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    dispatch({
      type: ProjectActionTypes.ADD_PROJECT,
      payload: {
        name: proj.name,
      },
    });
    // localStorage.setItem('projectss', JSON.stringify(response))
  };
};

export const deleteProject = (uuid: string) => {
  return (dispatch: Dispatch<ProjectAction>) => {
    const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    // console.log(response);

    const removeArr = [...response].filter((item) => item.id !== uuid);
    // console.log(removeArr);

    localStorage.setItem("projectss", JSON.stringify(removeArr));
    dispatch({
      type: ProjectActionTypes.DELETE_PROJECT,
      payload: {
        id: uuid,
      },
    });
  };
};

export const fetchProject = (id: string | undefined) => {
  return (dispatch: Dispatch<ProjectAction>) => {
    dispatch({ type: ProjectActionTypes.FETCH_PROJECT });
    const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    //Имитация запроса на сервер
    let newRes: any[] = [];

    response.map((item: ProjectState) => {
      if (item.id == id) newRes = item.tasks;
    });

    //setting time at work if we fetching projects
    const now: any = new Date();
    let newDate: any = (date: any) => {
      return new Date(date);
    };
    newRes.map((task: TaskState) => {
      task.timeAtWork = Math.floor(
        (now - newDate(task.createdDate)) / 1000 / 60
      );
    });

    setTimeout(() => {
      dispatch({
        type: ProjectActionTypes.FETCH_PROJECT_SUCCESS,
        payload: {
          tasks: newRes,
        },
      });
    }, 1);
  };
};

//   export const addToTasks = (proj:ProjectState,task: TaskState)=>{
//     return (dispatch: Dispatch<TaskAction>)=>{
//       if(task.title!==null){
//       const response = JSON.parse(localStorage.getItem("projectss") || "[]");
//       response.map((item:ProjectState)=>{
//         if(item==proj){
//           item.tasks.push(task)
//         }
//       })
//       console.log(response);
//       // localStorage.setItem('projectss', JSON.stringify(response))
//       dispatch({
//         type:ProjectActionTypes.ADD_TO_TASKS,
//         payload:{
//           tasks: response
//         }
//       })}
//     }
// }

export const addTaskToProject = (task: TaskState, id: string | undefined) => {
  return (dispatch: Dispatch<ProjectAction>) => {
    if (task.title !== null) {
      const response = JSON.parse(localStorage.getItem("projectss") || "[]");
      let name: string | null = "";
      response.map((item: ProjectState) => {
        if (item.id == id) name = item.name;
        item.tasks.push(task);
      });

      // КАК ПРАВИЛЬНО ДОБАВИТЬ ТАСКИ В ПРОЕКТ ПОДУМАЙ...
      localStorage.setItem("projectss", JSON.stringify(response));
      dispatch({
        type: ProjectActionTypes.ADD_TO_PROJECT,
        payload: {
          tasks: response,
          name: name,
        },
      });
    }
  };
};

export const changeTaskInProject = (
  tasks: TaskState[],
  id: string | undefined
) => {
  return (dispatch: Dispatch<ProjectAction>) => {
    const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    let a = 0;

    response.map((item: ProjectState) => {
      if (item.id == id) {
        item.tasks = [];
        item.tasks = tasks;
      }
    });

    localStorage.setItem("projectss", JSON.stringify(response));
    dispatch({
      type: ProjectActionTypes.CHANGE_TASK_IN_PROJECT,
      payload: {
        tasks: response,
      },
    });
  };
};

export const deleteTaskFromProject = (
  task: TaskState[],
  id: string | undefined
) => {
  return (dispatch: Dispatch<ProjectAction>) => {
    const response = JSON.parse(localStorage.getItem("projectss") || "[]");
    // console.log(task);
    response.map((item: ProjectState) => {
      if (item.id == id) {
        item.tasks = [];
        item.tasks = task;
      }
      // console.log(item.tasks);
    });
    // console.log(removeArr);

    localStorage.setItem("projectss", JSON.stringify(response));
    if (response.tasks !== undefined)
      dispatch({
        type: ProjectActionTypes.DELETE_TASK_FROM_PROJECT,
        payload: {
          tasks: response.tasks,
        },
      });
  };
};
