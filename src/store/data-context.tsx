"use client"

import { createContext, useReducer } from "react";
import dummyProjects from "../projects.json";
import dummyTasks from "../tasks.json";
import { Project } from "../components/Sidebar";
import { Task } from "../app/project-details/page";

type InitialStateType = {
  projects: Project[],
  tasks: Task[],
  addProject: (project: Project) => void,
  deleteProject: (id: string) => void, 
}

const initialState: InitialStateType = {
  projects: [],
  tasks: [],
  addProject: () => {},
  deleteProject: () => {}, 
};

export const DataContext = createContext<InitialStateType>(initialState);

function DataReducer(state: any, action: any) {
  if (action.type === "ADD_PROJECT") {
    const updatedProjects = [...state.projects];

    updatedProjects.push({
      id: action.project.id,
      title: action.project.title,
      description: action.project.description,
      dueDate: action.project.dueDate,
    });

    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    return {
      projects: updatedProjects,
      ...state
    };
  }

  if (action.type === "DELETE_PROJECT") {
    const updatedProjects = [...state.projects];
    const deletedProjectIndex = updatedProjects.findIndex(
      (project) => project.id === action.id
    );

    updatedProjects.splice(deletedProjectIndex, 1);

    // const updatedItem = {
    //   ...updatedItems[updatedItemIndex],
    // };

    // updatedItem.quantity += action.amount;

    // if (updatedItem.quantity <= 0) {
    //   updatedItems.splice(updatedItemIndex, 1);
    // } else {
    //   updatedItems[updatedItemIndex] = updatedItem;
    // }

    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    return {
      projects: updatedProjects,
      ...state
    };
  }

  // if (action.type === "ADD_TASK") {
  //   const updatedTasks = [...state.tasks];

  //   updatedTasks.push({
  //     id: action.task.id,
  //     title: action.task.title,
  //     projectId: action.task.projectId,
  //     dueDate: action.task.dueDate,
  //   });

  //   localStorage.setItem('projects', JSON.stringify(updatedTasks));

  //   return {
  //     projects: updatedTasks,
  //   };
  // }

  // return state;
}

const DataContextProvider: React.FC<{ children?: React.ReactNode }> = (props) => {
  const [dataState, dataDispatch] = useReducer<(state: any, action: any) => any>(DataReducer, {
    projects: dummyProjects, // JSON.parse(localStorage.getItem('projects')) || dummyProjects
    tasks: dummyTasks, // JSON.parse(localStorage.getItem('tasks')) || dummyTasks
  });

  function addProject(project: Project) {
    dataDispatch({
      type: "ADD_PROJECT",
      project
    });
  }
    
  function deleteProject(id: string) {
    dataDispatch({
      type: "DELETE_PROJECT",
      id
    });
  }

  // function addTask(task: Task) {
  //   dataDispatch({
  //     type: "ADD_TASK",
  //     task
  //   });
  // }
  
  // function deleteTask(id: string) {
  //   dataDispatch({
  //     type: "DELETE_TASK",
  //     id
  //   });
  // }

  const ctxValue = {
    projects: dataState.projects,
    tasks: dataState.tasks,
    addProject,
    deleteProject
  };

  return (
    <DataContext.Provider value={ctxValue}>{props.children}</DataContext.Provider>
  );
}

export default DataContextProvider;