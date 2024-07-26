"use client";

import { useContext } from "react";
import { DataContext } from "../store/data-context";
import { useRouter } from "next/navigation";
import { Project } from "../types";
import ProjectsList from "./ProjectsList";
import Button from "./Button";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { setProjectId } = useContext(DataContext);

  const openForm = () => {
    setProjectId(undefined);
    router.push("/new-project");
  };

  return (
    <aside className="rounded-r-xl bg-stone-900 px-8 py-16 text-stone-50 md:w-[22rem]">
      <Button onClick={openForm}>Add Project</Button>
      <h2 className="mb-8 font-bold uppercase text-stone-200 md:text-xl">
        Your Projects
      </h2>
      <ProjectsList/>
    </aside>
  );
};

export default Sidebar;
