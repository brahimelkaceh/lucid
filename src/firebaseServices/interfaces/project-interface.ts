import { Project } from 'src/types/project';

// ! Interface defining the shape of methods for interacting with projects
interface ProjectsInterface {
  // Fetch all projects with optional filtering and pagination
  getAllProjects(request?: {
    filters?: {
      query?: string;
      status?: string;
    };
    page?: number;
    rowsPerPage?: number | undefined;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
  }): Promise<{
    projects: Project[];
    count: number;
  }>;

  // ! Create a new project
  createProject(newProject: Project): Promise<void>;

  // ! Update an existing project
  updateProject(projectId: string, updatedData: any): Promise<void>;

  // ! Delete an existing project
  deleteProject(projectId: string): Promise<void>;

  // ! Get projects' IDs and names
  getProjectsIdAndName(): Promise<{ id: string; project_name: string }[]>;

  // ! Get a project by its ID
  getProjectById(projectId: string): Promise<Project | null>;
}

export default ProjectsInterface;
