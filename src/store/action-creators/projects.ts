import { Dispatch } from "redux";
import { ProjectState } from "../../types/project";
import { ProjectsAction, ProjectsActionTypes } from "../../types/projects";

export const fetchProjects = () => {
  return (dispatch: Dispatch<ProjectsAction>) => {
    try {
      dispatch({ type: ProjectsActionTypes.FETCH_PROJECTS });
      const response = JSON.parse(localStorage.getItem("projectss") || "[]");
      //Имитация запроса на сервер
      setTimeout(() => {
        dispatch({
          type: ProjectsActionTypes.FETCH_PROJECTS_SUCCESS,
          payload: {
            projects: response,
            loading: false,
            error: null,
          },
        });
      }, 1);
    } catch (er) {
      dispatch({
        type: ProjectsActionTypes.FETCH_PROJECTS_ERROR,
        payload: {
          error: "Error",
        },
      });
    }
  };
};

export const addToProjects = (proj: ProjectState) => {
  return (dispatch: Dispatch<ProjectsAction>) => {
    if (proj.name !== null) {
      const response = JSON.parse(localStorage.getItem("projectss") || "[]");
      response.push(proj);
      // console.log(response);
      localStorage.setItem("projectss", JSON.stringify(response));
      dispatch({
        type: ProjectsActionTypes.ADD_TO_PROJECTS,
        payload: {
          projects: response,
        },
      });
    }
  };
};
