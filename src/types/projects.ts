// import { ProjectAction, ProjectActionTypes, ProjectState } from "./project";

export enum ProjectsActionTypes {
    // ADD_PROJECT = "ADD_PROJECT",
    // DELETE_PROJECT = "DELETE_PROJECT",
    // RENAME_PROJECT = "RENAME_PROJECT",
    FETCH_PROJECTS = "FETCH_PROJECTS",
    FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS",
    FETCH_PROJECTS_ERROR = "FETCH_PROJECTS_ERROR",
    ADD_TO_PROJECTS = "ADD_TO_PROJECTS"
  }
  
  export interface ProjectsState {
    projects: any[],
    loading: boolean,
    error: null | string
  }
  
//   interface AddProjectAction {
//     type: ProjectActionTypes.ADD_PROJECT;
//     payload: {
//       name: string;
//       tasks: any[];
//     };
//   }
//   interface DeleteProjectAction {
//     type: ProjectActionTypes.DELETE_PROJECT;
//     payload: {
//       name: string;
//       tasks: any[];
//     };
//   }
//   interface RenameProjectAction {
//     type: ProjectActionTypes.RENAME_PROJECT;
//     payload: {
//       name: string;
//       tasks: any[];
//     };
//   }
  interface FetchProjectsAction {
    type: ProjectsActionTypes.FETCH_PROJECTS;
  }
  interface FetchProjectsSuccessAction {
    type: ProjectsActionTypes.FETCH_PROJECTS_SUCCESS;
    payload: {
      projects: any[];
      loading:false;
      error: null;
    };
  }
  interface FetchProjectsErrorAction {
    type: ProjectsActionTypes.FETCH_PROJECTS_ERROR;
    payload: {
      error: string;
    };
  }
  interface AddToPrjectsAction {
    type: ProjectsActionTypes.ADD_TO_PROJECTS;
    payload: {
      projects: any[]
    }
  }
  export type ProjectsAction =
    // | AddProjectAction
    // | DeleteProjectAction
    // | RenameProjectAction
     FetchProjectsAction
    | FetchProjectsErrorAction
    | FetchProjectsSuccessAction
    | AddToPrjectsAction;
  