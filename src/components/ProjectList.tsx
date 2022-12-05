import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import {
  addProject,
  addTaskToProject,
  deleteProject,
} from "../store/action-creators/project";
import {
  addToProjects,
  fetchProjects,
} from "../store/action-creators/projects";
import DeleteIcon from "@mui/icons-material/Delete";

const ProjectList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [projectToAdd, setProjectToAdd] = useState("");
  const { loading, error, projects } = useTypedSelector(
    (state) => state.projects
  );
  const project = useTypedSelector((state) => state.project);
  const task = useTypedSelector((state) => state.task);

  // console.log(projects);

  const handleChangeItem = (event: any) => {
    setProjectToAdd(event.target.value);
  };
  useEffect(() => {
    if (!localStorage.getItem("projectss")) {
      localStorage.setItem("projectss", JSON.stringify(projects));
    }
  }, []);
  useEffect(() => {
    dispatch(addToProjects(project));
    dispatch(fetchProjects());
  }, [project]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}...</h1>;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          style={{ height: "25px" }}
          value={projectToAdd}
          type="text"
          className="form-control"
          placeholder="Project name"
          onChange={handleChangeItem}
        ></input>
        <Button
          onClick={() => dispatch(addProject({ name: projectToAdd }))}
          size="small"
          variant="contained"
          color="success"
        >
          Add project
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {projects.map((proj) => (
          <div key={proj.id} style={{ display: "flex" }}>
            <Link to={`/project/${proj.id}`}>
              <h3>{proj.name}</h3>
            </Link>
            <IconButton
              onClick={() => dispatch(deleteProject(proj.id))}
              aria-label="delete"
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}{" "}
      </div>
    </>
  );
};

export default ProjectList;
