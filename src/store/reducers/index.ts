import { combineReducers } from "redux";
import { projectReducer } from "./projectReducer";
import { projectsReducer } from "./projectsReducer";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
    project: projectReducer,
    projects: projectsReducer,
    task: taskReducer
})

export type RootState = ReturnType<typeof rootReducer>

