import React from 'react';
import { Link, Route, Router, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList'
import TaskList from './components/TaskList';
import { useTypedSelector } from './hooks/useTypedSelector';
function App() {
  const {loading,error,projects} = useTypedSelector(state=>state.projects)
  return (
    <div className="App">
      <Link to='/' >Projects</Link>
      
  <Routes>
    <Route path='/' element={<ProjectList/>}/>
    <Route path="/project/:id" element={<TaskList />} />
  </Routes>

      
        {/* {projects.map((proj)=>(
          <div key={proj.id}>
          <TaskList/>
          </div>
        ))} */}
    </div>
  );
}

export default App;
