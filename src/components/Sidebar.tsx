import ProjectsList from "./ProjectsList";
import Button from "./Button";

export type Project = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
};

interface SidebarProps {
  projects: Project[];
  selectedProjectId: string | boolean;
  onCreateProject: () => {} | any;
  onDisplayProject: (id: string) => {} | any;
}

const Sidebar: React.FC<SidebarProps> = ({
  projects,
  onCreateProject,
  onDisplayProject,
  selectedProjectId,
}) => {
  return (
    <aside className="rounded-r-xl bg-stone-900 px-8 py-16 text-stone-50 md:w-[22rem]">
      <Button onClick={onCreateProject}>Add Project</Button>
      <h2 className="mb-8 font-bold uppercase text-stone-200 md:text-xl">
        Your Projects
      </h2>
      <ProjectsList
        items={projects}
        onLiftProject={onDisplayProject}
        selectedProjectId={selectedProjectId}
      />
    </aside>
  );
};

export default Sidebar;
