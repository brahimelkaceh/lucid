// Import necessary Firebase modules
import { FirebaseApp, FirebaseError, initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  Query,
  query,
  where,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  Firestore,
  CollectionReference,
  getDoc,
} from 'firebase/firestore';
import * as Sentry from '@sentry/browser';
import { Project } from 'src/types/project';
import { firebaseConfig } from 'src/config';
import ProjectsInterface from '../interfaces/project-interface';

// Define the shape of the request for getting projects
type GetProjectsRequest = {
  filters?: {
    query?: string;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number | undefined;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

// Define the shape of the response for getting projects
type GetProjectsResponse = {
  projects: Project[];
  count: number;
};

// Class implementing ProjectsInterface using Firebase as the backend
class FirebaseProjects implements ProjectsInterface {
  private firebaseApp: FirebaseApp;
  private firestore: Firestore;
  private projectsCollection: CollectionReference<Project>;

  constructor() {
    // Initialize Firebase app and set up Firestore
    this.firebaseApp = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.firebaseApp);
    this.projectsCollection = collection(
      this.firestore,
      'projects'
    ) as CollectionReference<Project>;
  }

  // Method to fetch all projects with optional filtering and pagination
  async getAllProjects(request: GetProjectsRequest = {}): Promise<GetProjectsResponse> {
    const { filters, page = 1, rowsPerPage = 5, sortBy, sortDir } = request;

    try {
      const startIndex = (page - 0) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;

      let projectQuery: Query<Project> = query(this.projectsCollection);

      if (filters?.query) {
        const lowerCaseQuery = filters.query.toLowerCase();
        projectQuery = query(
          projectQuery,
          where('project_name', '>=', lowerCaseQuery),
          where('project_name', '<=', lowerCaseQuery + '\uf8ff')
        );
      }

      const querySnapshot = await getDocs(projectQuery);
      const totalProjects = querySnapshot.size;
      const projects = querySnapshot.docs.slice(startIndex, endIndex).map((doc) => {
        const { id, ...otherData } = doc.data();
        return { id: doc.id, ...otherData } as Project;
      });

      const response: GetProjectsResponse = {
        projects,
        count: totalProjects,
      };
      return response; // Explicit return statement here
    } catch (error) {
      console.error('Error getting projects: ', error);

      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Unexpected error: ${error.message}`);
      }
    }
  }

  // Method to create a new project
  async createProject(newProject: Project): Promise<void> {
    const lowercaseProjectName = newProject.project_name.toLowerCase();
    const project: Project = {
      ...newProject,
      project_name: lowercaseProjectName,
    };

    try {
      // Store the project with the lowercase project_name
      await addDoc(this.projectsCollection, project);
    } catch (error) {
      console.error('Error create new project: ', error);
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Custom error (${error.code}): ${error.message}`);
      }
    }
  }

  // Method to update an existing project
  async updateProject(projectId: string, updatedData: any): Promise<void> {
    try {
      const projectDocRef = doc(this.projectsCollection, projectId);
      await updateDoc(projectDocRef, updatedData);
    } catch (error) {
      console.error('Error update project: ', error);
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Custom error (${error.code}): ${error.message}`);
      }
    }
  }

  // Method to delete an existing project
  async deleteProject(projectId: string): Promise<void> {
    try {
      const projectDocRef = doc(this.projectsCollection, projectId);
      await deleteDoc(projectDocRef);
    } catch (error) {
      console.error('Error delete project: ', error);
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Custom error (${error.code}): ${error.message}`);
      }
    }
  }

  // Method to get projects ID and project name
  async getProjectsIdAndName(): Promise<{ id: string; project_name: string }[]> {
    try {
      const querySnapshot = await getDocs(this.projectsCollection);
      const projectsIdAndName = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;

        if (!id) {
          console.warn('Document has undefined ID:', doc);
        }

        const { project_name } = data as { project_name: string };
        return { id, project_name };
      });

      return projectsIdAndName;
    } catch (error) {
      console.error('Error get projects name and id: ', error);
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Custom error (${error.code}): ${error.message}`);
      }
    }
  }
  // Method to get project by ID
  async getProjectById(projectId: string): Promise<Project | null> {
    try {
      const projectDocRef = doc(this.projectsCollection, projectId);
      const projectDoc = await getDoc(projectDocRef);

      if (projectDoc.exists()) {
        const projectData = projectDoc.data();
        return { ...projectData, id: projectDoc.id } as Project;
      } else {
        console.warn(`Project with ID ${projectId} not found.`);
        return null;
      }
    } catch (error) {
      console.error('Error get project by id: ', error);
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Custom error (${error.code}): ${error.message}`);
      }
    }
  }
}

export default FirebaseProjects;
