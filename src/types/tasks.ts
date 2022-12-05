export enum TaskActionTypes {
    ADD_TASK = "ADD_TASK",
    DELETE_TASK = "DELETE_TASK",
    RENAME_TASK = "RENAME_TASK",
    FETCH_TASK = "FETCH_TASK",
    CHANGE_STATUS = "CHANGE_STATUS",
    CHANGE_TASK = "CHANGE_TASK",


  }
  
  export interface TaskState {
    id: string|null;
    title: string | null;
    description: string | null;
    createdDate: string | null;
    timeAtWork: any | null;
    finishedDate: string | null;
    priority: string | null;
    files: any[];
    currentStatus: string | null;
    subTasks: any[];
    comments: any[];
  }
  
  interface AddTaskAction {
    type: TaskActionTypes.ADD_TASK;
    payload: {
      title: string;
    };
  }
  interface DeleteTaskAction {
    type: TaskActionTypes.DELETE_TASK;
    payload: {
      id: string| null
    };
  }
  interface ChangeTaskStatus {
    type: TaskActionTypes.CHANGE_STATUS;
    payload: {
      id: string| null
      currentStatus: string|null
    };
  }
  interface ChangeTaskSettings {
    type: TaskActionTypes.CHANGE_TASK;
    payload: {
      title: string|null,
      id: string| null
      description: string| null;
    };
  }
  // interface RenameTaskAction {
  //   type: TaskActionTypes.RENAME_TASK;
  //   payload: {
  //     name: string;
  //     tasks: any[];
  //   };
  // }
  // interface FetchProjectAction {
  //   type: ProjectActionTypes.FETCH_PROJECT;
  // }
  // interface FetchProjectSuccessAction {
  //   type: ProjectActionTypes.FETCH_PROJECT_SUCCESS;
  //   payload: {
  //     name: string;
  //     tasks: any[];
  //     loading:false;
  //     error: null;
  //   };
  // }
  // interface FetchProjectErrorAction {
  //   type: ProjectActionTypes.FETCH_PROJECT_ERROR;
  //   payload: {
  //     error: string;
  //   };
  // }
  export type TaskAction =
    | AddTaskAction
    | DeleteTaskAction
    | ChangeTaskStatus
    | ChangeTaskSettings
    // | RenameTaskAction
    // | FetchProjectAction
    // | FetchProjectErrorAction
    // | FetchProjectSuccessAction;
  