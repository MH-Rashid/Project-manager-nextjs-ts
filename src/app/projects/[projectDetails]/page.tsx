"use client";

import { NextPage } from "next";
import { useContext, useState } from "react";
import { Project } from "@/src/types";
import { DataContext } from "@/src/store/data-context";
import { useRouter } from "next/navigation";
import { Task } from "@/src/types";
import { ProjectDetailsProps } from "@/src/types";

const ProjectDetailsPage: NextPage<ProjectDetailsProps> = (props) => {
  const { projects, tasks, deleteProject, deleteTask, addTask } = useContext(DataContext);
  const [enteredTask, setEnteredTask] = useState("");
  const projectId = props.params.projectDetails;
  const router = useRouter();

  const matchingProject: Project | any = projects.find(
    (project) => project.id === projectId
  );
  const matchingTasks: Task[] = tasks.filter(
    (task) => task.projectId === projectId
  );

  const formattedDate = new Date(matchingProject?.dueDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const handleDeleteProject = (projectId: string) => {
    deleteProject(projectId);
    router.push("/");
  };

  const handleAddTask = (taskName: string) => {
    if (enteredTask.trim() === "") {
      return;
    }

    const newTask = {
      title: taskName,
      id: Math.random().toFixed(4).toString(),
      projectId,
    };

    addTask(newTask);
    setEnteredTask("");
  };

  return (
    <div className="mt-32 mx-auto w-[45rem]">
      <header className="mb-4 border-b-2 border-stone-300 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-3xl font-bold text-stone-600">
            {matchingProject?.title}
          </h1>
          <button
            className="text-stone-600 hover:text-red-500"
            onClick={() => handleDeleteProject(matchingProject?.id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="whitespace-pre-wrap text-stone-600">
          {matchingProject?.description}
        </p>
      </header>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-stone-700">Tasks</h2>

        {matchingTasks.length === 0 && (
          <p className="my-4 text-stone-800">
            This project does not have any tasks yet.
          </p>
        )}

        <div className="flex items-center gap-4">
          <input
            className="w-64 rounded-sm bg-stone-200 px-2 py-1"
            value={enteredTask}
            onChange={() => {
              setEnteredTask((event?.target as HTMLInputElement).value);
            }}
            type="text"
          />
          <button
            onClick={() => handleAddTask(enteredTask)}
            className="text-stone-600 hover:text-stone-950"
          >
            Add Task
          </button>
        </div>

        {matchingTasks.length > 0 && (
          <ul className="mt-8 flex flex-col gap-2 rounded-md bg-gray-100 p-4">
            {matchingTasks.map((task) => (
              <li className="flex justify-between" key={task.id}>
                <p>{task.title}</p>
                <button
                  className="text-stone-700 hover:text-red-500"
                  onClick={() => deleteTask(task.id)}
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ProjectDetailsPage;