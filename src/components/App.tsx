"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "./Sidebar";
import Home from "../app/page";
import Fallback from "./Fallback";

const App: React.FC<{ children?: React.ReactNode }> = (props) => {
  const router = useRouter();

  const [selectedProjectId, setSelectedProjectId] = useState(false);
  const [projects, setProjects] = useState(dummyProjects);
  const [tasks, setTasks] = useState(dummyTasks);

  const handleCreateProject = () => {
    setSelectedProjectId(false);
    router.push("/new-project");
    // setFormDisplay(true);
  };

  // function handleDeleteProject(id) {
  //   const filteredProjects = projects.filter((project) => project.id !== id);
  //   setProjects(filteredProjects);
  //   setSelectedProjectId(false);
  // }

  // const handleAddTask = (task) => {
  //   setTasks((prevState) => {
  //     const taskId = Math.random();
  //     const newTask = {
  //       title: task,
  //       id: taskId,
  //       projectId: selectedProjectId,
  //     };

  //     return [...prevState, newTask];
  //   });
  // };

  // const handleDeleteTask = (taskId) => {
  //   const updatedTasks = tasks.filter((task) => task.id !== taskId);
  //   setTasks(updatedTasks);
  // };

  return (
    <Sidebar
      projects={projects}
      selectedProjectId={selectedProjectId}
      onDisplayProject={() => {}}
      onCreateProject={handleCreateProject}
    />
  );
};

export default App;
