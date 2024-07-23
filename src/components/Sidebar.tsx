import ProjectsList from "./ProjectsList";
import Button from "./Button";

interface SidebarProps {
  projects: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
  }[],
  onCreateProject?: () => {},
  onDisplayProject?: () => {},
  selectedProjectId: string|boolean
}

const Sidebar: React.FC<SidebarProps> = ({projects, onCreateProject, onDisplayProject, selectedProjectId}) => {
  return (
    <aside className="rounded-r-xl bg-stone-900 px-8 py-16 text-stone-50 md:w-[22rem]">
      <Button onClick={onCreateProject} >
        Add Project
      </Button>
      <h2 className="mb-8 font-bold uppercase text-stone-200 md:text-xl">
        Your Projects
      </h2>
      <ProjectsList items={projects} onLiftProject={onDisplayProject} selectedProjectId={selectedProjectId} />
    </aside>
  );
}

export default Sidebar