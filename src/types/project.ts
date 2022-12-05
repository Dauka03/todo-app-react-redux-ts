export enum ProjectActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
  RENAME_PROJECT = "RENAME_PROJECT",
  FETCH_PROJECT = "FETCH_PROJECT",
  FETCH_PROJECT_SUCCESS = "FETCH_PROJECT_SUCCESS",
  // FETCH_PROJECT_ERROR = "FETCH_PROJECT_ERROR",
  ADD_TO_PROJECT = "ADD_TO_PROJECT",
  CHANGE_TASK_IN_PROJECT = "CHANGE_TASK_IN_PROJECT",
  DELETE_TASK_FROM_PROJECT = "DELETE_TASK_FROM_PROJECT"

}

export interface ProjectState {
  id: string|null;
  name: string | null;
  tasks: any[];
}
interface AddToProjectAction {
  type: ProjectActionTypes.ADD_TO_PROJECT;
  payload: {
    tasks: any[];
    name: string|null
  }
}
interface AddProjectAction {
  type: ProjectActionTypes.ADD_PROJECT;
  payload: {
    name: string;
  };
}
interface ChangeTaskInProject {
  type: ProjectActionTypes.CHANGE_TASK_IN_PROJECT;
  payload: {
    tasks: any[];
  };
}
interface DeleteProjectAction {
  type: ProjectActionTypes.DELETE_PROJECT;
  payload: {
    id: string
  };
}
interface DeleteTaskFromProjectAction {
  type: ProjectActionTypes.DELETE_TASK_FROM_PROJECT;
  payload:{
    tasks: any[]
  }
  
}
interface RenameProjectAction {
  type: ProjectActionTypes.RENAME_PROJECT;
  payload: {
    name: string;
    tasks: any[];
  };
}
interface FetchProjectAction {
  type: ProjectActionTypes.FETCH_PROJECT;
}
interface FetchProjectSuccessAction {
  type: ProjectActionTypes.FETCH_PROJECT_SUCCESS;
  payload: {
    tasks: any[];
  };
}
// interface FetchProjectErrorAction {
//   type: ProjectActionTypes.FETCH_PROJECT_ERROR;
//   payload: {
//     error: string;
//   };
// }
export type ProjectAction =
  | AddProjectAction
  | DeleteProjectAction
  | RenameProjectAction
  | FetchProjectAction
  // | FetchProjectErrorAction
  | AddToProjectAction
  | FetchProjectSuccessAction
  | ChangeTaskInProject
  | DeleteTaskFromProjectAction;
