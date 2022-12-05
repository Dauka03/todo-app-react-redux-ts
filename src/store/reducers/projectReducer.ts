import {
  ProjectAction,
  ProjectActionTypes,
  ProjectState,
} from "../../types/project";
import { v4 as uuidv4 } from "uuid";
import { act } from "react-dom/test-utils";
const initalState: ProjectState = {
  id: null,
  name: null,
  tasks: [],
};

export const projectReducer = (
  state = initalState,
  action: ProjectAction
): ProjectState => {
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT:
      return {
        id: uuidv4(),
        name: action.payload.name,
        tasks: [],
      };
    case ProjectActionTypes.DELETE_PROJECT:
      return {
        id: action.payload.id,
        name: null,
        tasks: [],
      };
    case ProjectActionTypes.RENAME_PROJECT:
      return {
        id: uuidv4(),
        name: action.payload.name,
        tasks: [],
      };
    case ProjectActionTypes.FETCH_PROJECT:
      return { id: null, name: null, tasks: [] };
    case ProjectActionTypes.FETCH_PROJECT_SUCCESS:
      return {
        id: null,
        name: null,
        tasks: action.payload.tasks,
      };
      case ProjectActionTypes.ADD_TO_PROJECT:
      return {
        id:uuidv4(),
        tasks: action.payload.tasks,
        name: action.payload.name
      };
    case ProjectActionTypes.FETCH_PROJECT_SUCCESS:
      return {
        id: null,
        name: null,
        tasks: action.payload.tasks,
      };
    case ProjectActionTypes.CHANGE_TASK_IN_PROJECT:
      return{
        id:null,
        tasks: action.payload.tasks,
        name: null
      }
    case ProjectActionTypes.DELETE_TASK_FROM_PROJECT:
      return{
        name: null,
        tasks: action.payload.tasks,
        id: null
      }
    default:
      return state;
  }
};
