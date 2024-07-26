"use client"

import { createContext, useEffect, useReducer } from "react";
import dummyProjects from "../projects.json";
import dummyTasks from "../tasks.json";
import { Project } from "../types";
import { Task } from "../types";
import { InitialStateType } from "../types";

const initialState: InitialStateType = {
  projects: [],
  tasks: [],
  selectedProjectId: undefined,
  addProject: () => {},
  deleteProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
  setProjectId: () => {},
};

export const DataContext = createContext<InitialStateType>(initialState);

function DataReducer(state: any, action: any) {
  if (action.type === "FETCH_DATA") {
    return {
      ...state,
      projects: action.projects,
      tasks: action.tasks
    };
  }

  if (action.type === "ADD_PROJECT") {
    const updatedProjects = [...state.projects];

    updatedProjects.push({
      id: action.project.id,
      title: action.project.title,
      description: action.project.description,
      dueDate: action.project.dueDate,
    });

    console.log(updatedProjects);

    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    return {
      ...state,
      projects: updatedProjects,
    };
  }

  if (action.type === "DELETE_PROJECT") {
    const filteredProjects = state.projects.filter(
      (project: any) => project.id !== action.id
    );
    console.log(filteredProjects);

    localStorage.setItem("projects", JSON.stringify(filteredProjects));

    return {
      ...state,
      projects: filteredProjects,
    };
  }

  if (action.type === "ADD_TASK") {
    const updatedTasks = [...state.tasks];

    updatedTasks.push({
      id: action.task.id,
      title: action.task.title,
      projectId: action.task.projectId,
    });

    console.log(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return {
      ...state,
      tasks: updatedTasks,
    };
  }

  if (action.type === "DELETE_TASK") {
    const filteredTasks = state.tasks.filter(
      (task: any) => task.id !== action.id
    );
    console.log(filteredTasks);

    localStorage.setItem("tasks", JSON.stringify(filteredTasks));

    return {
      ...state,
      tasks: filteredTasks,
    };
  }

  if (action.type === "SET_PROJECT_ID") {
    return {
      ...state,
      selectedProjectId: action.id,
    };
  }

  return state;
}

const DataContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  const fetchedProjects = useEffect(() => {
    typeof window !== undefined ? localStorage.getItem('projects') : null
  }, [])

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    const fetchedProjects = savedProjects ? JSON.parse(savedProjects) : dummyProjects;
    const savedTasks = localStorage.getItem('tasks');
    const fetchedTasks = savedTasks ? JSON.parse(savedTasks) : dummyTasks;

    fetchData(fetchedProjects, fetchedTasks);
  }, []);
  
  const [dataState, dataDispatch] = useReducer<(state: any, action: any) => any>(DataReducer, {
    projects: [],
    tasks: [],
    selectedProjectId: undefined,
  });

  function fetchData(projects: Project[], tasks: Task[]) {
    dataDispatch({
      type: "FETCH_DATA",
      projects,
      tasks
    });
  }

  function addProject(project: Project) {
    dataDispatch({
      type: "ADD_PROJECT",
      project,
    });
  }

  function deleteProject(id: string) {
    dataDispatch({
      type: "DELETE_PROJECT",
      id,
    });
  }

  function addTask(task: Task) {
    dataDispatch({
      type: "ADD_TASK",
      task,
    });
  }

  function deleteTask(id: string) {
    dataDispatch({
      type: "DELETE_TASK",
      id,
    });
  }

  function setProjectId(id: string | undefined) {
    dataDispatch({
      type: "SET_PROJECT_ID",
      id,
    });
  }

  const ctxValue = {
    projects: dataState.projects,
    tasks: dataState.tasks,
    selectedProjectId: dataState.selectedProjectId,
    addProject,
    deleteProject,
    addTask,
    deleteTask,
    setProjectId,
  };

  return (
    <DataContext.Provider value={ctxValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;