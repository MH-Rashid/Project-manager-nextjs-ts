"use client";

// fallback page

import React from "react";
import { useRouter } from "next/navigation";
import fallbackImage from "../assets/no-projects.png";
import Button from "../components/Button";
import Image from "next/image";

const Home: React.FC<{onCreateProject: () => void}> = (props) => {
  const router = useRouter();
  
  const handleCreateProject = () => {
    // setSelectedProjectId(false);
    router.push("/new-project");
    // setFormDisplay(true);
  };
  
  return (
    <div className="mt-24 w-2/3 text-center">
      <Image src={fallbackImage} className="mx-auto h-16 w-16 object-contain" alt="A clipboard and pen" />
      <h1 className="my-4 text-xl font-bold text-stone-500">
        No Project Selected
      </h1>
      <p className="mb-4 text-stone-500">
        Select a project or get started with a new one
      </p>
      <Button onClick={handleCreateProject}>
        Create new project
      </Button>
    </div>
  );
}

export default Home;