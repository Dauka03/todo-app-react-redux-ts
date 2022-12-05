// import {
//     ProjectAction,
//     ProjectActionTypes,
//     ProjectState,
//   } from "../../types/project";
import {
  ProjectsAction,
  ProjectsActionTypes,
  ProjectsState,
} from "../../types/projects";

const initalState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

export const projectsReducer = (
  state = initalState,
  action: ProjectsAction
): ProjectsState => {
  switch (action.type) {
    //   case ProjectActionTypes.ADD_PROJECT:
    //     return {
    //       name: action.payload.name,
    //       tasks: [],
    //       loading: false,
    //       error: null,
    //     };
    //   case ProjectActionTypes.DELETE_PROJECT:
    //     return {
    //       name: action.payload.name,
    //       tasks: [],
    //       loading: false,
    //       error: null,
    //     };
    //   case ProjectActionTypes.RENAME_PROJECT:
    //     return {
    //       name: action.payload.name,
    //       tasks: [],
    //       loading: false,
    //       error: null,
    //     };
    case ProjectsActionTypes.FETCH_PROJECTS:
      return { projects: [], loading: true, error: null };
    case ProjectsActionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        projects: action.payload.projects,
        loading: false,
        error: null,
      };
    case ProjectsActionTypes.FETCH_PROJECTS_ERROR:
      return {
        projects: [],
        loading: false,
        error: action.payload.error,
      };
    case ProjectsActionTypes.ADD_TO_PROJECTS:
      return {
        projects: [],
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
