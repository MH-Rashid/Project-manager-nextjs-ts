export type Project = {
  id: string;
  title: string;
  description: string;
  dueDate: any;
};

export type Task = {
  title: string;
  id: string;
  projectId: string;
};

export type InitialStateType = {
  projects: Project[];
  tasks: Task[];
  selectedProjectId: string | undefined;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setProjectId: (id: string | undefined) => void;
};