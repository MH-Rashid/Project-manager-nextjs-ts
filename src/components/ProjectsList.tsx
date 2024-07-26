"use client";

import { useContext } from "react";
import { DataContext } from "../store/data-context";
import Link from "next/link";

const ProjectsList: React.FC = () => {
  const { projects, selectedProjectId, setProjectId } = useContext(DataContext);

  return (
    <ul>
      {projects.length === 0 && <p>No projects yet</p>}
      
      {projects.length > 0 && projects.map((project) => {
        let cssClasses = "px-2 py-1 w-full text-left rounded-sm my-1";

        if (project.id === selectedProjectId) {
          cssClasses += " text-stone-200 bg-stone-800";
        } else {
          cssClasses += " text-stone-400";
        }

        return (
          <Link key={project.id} href={`/projects/${project.id}`} onClick={() => {setProjectId(project.id)}}>
            <li className={cssClasses}>
              {project.title}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default ProjectsList;
