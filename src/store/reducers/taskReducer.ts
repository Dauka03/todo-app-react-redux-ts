import { TaskAction, TaskActionTypes, TaskState } from "../../types/tasks";
import { v4 as uuidv4 } from "uuid";
import { act } from "react-dom/test-utils";

const initalState: TaskState = {
  id: null,
  title: null,
  description: null,
  createdDate: null,
  timeAtWork: null,
  finishedDate: null,
  priority: null,
  files: [],
  currentStatus: null,
  subTasks: [],
  comments: [],
};
export const taskReducer = (
  state = initalState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK: {
      return {
        id: uuidv4(),
        title: action.payload.title,
        description: null,
        createdDate: new Date().toISOString(),
        timeAtWork: null,
        finishedDate: null,
        priority: null,
        files: [],
        currentStatus: "queue",
        subTasks: [],
        comments: [],
      };
    }
    case TaskActionTypes.CHANGE_STATUS: {
      return{
        id: action.payload.id,
        title: null,
        description: null,
        createdDate: new Date().toISOString(),
        timeAtWork: null,
        finishedDate: null,
        priority: null,
        files: [],
        currentStatus: action.payload.currentStatus,
        subTasks: [],
        comments: [],
      }
    }
    case TaskActionTypes.CHANGE_TASK: {
      return{
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        createdDate: new Date().toISOString(),
        timeAtWork: null,
        finishedDate: null,
        priority: null,
        files: [],
        currentStatus: null,
        subTasks: [],
        comments: [],
      }
    }
    case TaskActionTypes.DELETE_TASK: {
      return{
        id: action.payload.id,
        title: null,
        description: null,
        createdDate: new Date().toISOString(),
        timeAtWork: null,
        finishedDate: null,
        priority: null,
        files: [],
        currentStatus: null,
        subTasks: [],
        comments: [],
      }
    }
    default:
      return state;
  }
};
