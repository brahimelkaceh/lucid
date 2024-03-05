import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';
import { Customer, CustomerEmail, CustomerInvoice, CustomerLog } from 'src/types/customer';
import { firebaseConfig } from 'src/config';
import { firebaseApp } from 'src/libs/firebase';
import { Project } from 'src/types/project';

type GetProjectsRequest = {
  filters?: {
    query?: string; // Change this to represent the name filter
    email?: string; // Add this for filtering by email
  };
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetProjectsResponse = Promise<{
  data: Project[];
  count: number;
}>;

type GetProjectRequest = object;

type GetProjectResponse = Promise<Project>;

type GetProjectEmailsRequest = object;

type GetProjectEmailsResponse = Promise<CustomerEmail[]>;

type GetProjectInvoicesRequest = object;

type GetProjectInvoicesResponse = Promise<CustomerInvoice[]>;

type GetProjectLogsRequest = object;

type GetProjectLogsResponse = Promise<CustomerLog[]>;

class ProjectsApi {
  private firestore = getFirestore(firebaseApp);

  constructor() {
    // Initialize Firebase only if it hasn't been initialized before
    if (getApps().length === 0) {
      initializeApp(firebaseConfig);
    }
  }

  async getAllProjects(request: GetProjectsRequest = {}): GetProjectsResponse {
    const { filters, page, rowsPerPage } = request;

    try {
      let projectQuery = query(
        collection(this.firestore, 'projects')
      ) as import('firebase/firestore').Query<Project>;
      let count = 0;

      if (filters) {
        // Apply filters
        if (filters.query) {
          const lowerCaseQuery = filters.query.toLowerCase();
          projectQuery = query(
            projectQuery,
            where('project_name', '>=', lowerCaseQuery),
            where('project_name', '<=', lowerCaseQuery + '\uf8ff')
          );
        }

        if (filters.email) {
          projectQuery = query(projectQuery, where('email', '==', filters.email.toLowerCase()));
        }

        // Get the data and count
        const snapshot: QuerySnapshot<Project> = await getDocs(projectQuery);
        count = snapshot.size;
      }

      // Apply pagination
      // if (page !== undefined && rowsPerPage !== undefined) {
      //   projectQuery = applyPagination(projectQuery, page, rowsPerPage);
      // }

      // Get the data
      const data = (await getDocs(projectQuery)).docs.map((doc) => {
        const { id, ...otherData } = doc.data();
        return { id: doc.id, ...otherData } as Project;
      });
      count = data.length;
      return {
        data,
        count,
      };
    } catch (error) {
      console.error('Error getting Projects: ', error);
      throw error;
    }
  }

  async getProject(request?: GetProjectRequest): GetProjectResponse {
    try {
      // Replace 'CUSTOMER_ID' with the actual customer ID
      const doc = await getDocs(collection(this.firestore, 'Projects', 'CUSTOMER_ID'));
      if (doc.docs.length > 0) {
        return deepCopy(doc.docs[0].data() as Customer);
      } else {
        console.error('Customer not found');
        throw new Error('Customer not found');
      }
    } catch (error) {
      console.error('Error getting customer: ', error);
      throw error;
    }
  }

  async getEmails(request?: GetProjectEmailsRequest): GetProjectEmailsResponse {
    try {
      // Replace 'CUSTOMER_ID' with the actual customer ID
      const snapshot = await getDocs(
        collection(this.firestore, 'Projects', 'CUSTOMER_ID', 'emails')
      );
      return snapshot.docs.map((doc) => doc.data() as CustomerEmail);
    } catch (error) {
      console.error('Error getting emails: ', error);
      throw error;
    }
  }

  async getInvoices(request?: GetProjectInvoicesRequest): GetProjectInvoicesResponse {
    try {
      // Replace 'CUSTOMER_ID' with the actual customer ID
      const snapshot = await getDocs(
        collection(this.firestore, 'Projects', 'CUSTOMER_ID', 'invoices')
      );
      return snapshot.docs.map((doc) => doc.data() as CustomerInvoice);
    } catch (error) {
      console.error('Error getting invoices: ', error);
      throw error;
    }
  }

  async getLogs(request?: GetProjectLogsRequest): GetProjectLogsResponse {
    try {
      // Replace 'CUSTOMER_ID' with the actual customer ID
      const snapshot = await getDocs(collection(this.firestore, 'Projects', 'CUSTOMER_ID', 'logs'));
      return snapshot.docs.map((doc) => doc.data() as CustomerLog);
    } catch (error) {
      console.error('Error getting logs: ', error);
      throw error;
    }
  }
}

export const allProjectsApi = new ProjectsApi();
