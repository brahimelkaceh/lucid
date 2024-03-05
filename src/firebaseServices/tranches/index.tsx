// Import necessary Firebase modules
import { FirebaseApp, FirebaseError, initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  Firestore,
  CollectionReference,
} from 'firebase/firestore';
import { Project } from 'src/types/project';
import { firebaseConfig } from 'src/config';
import { slice } from 'src/types/slice';
import SlicesInterface from '../interfaces/slice-interface';
import * as Sentry from '@sentry/browser';

type GetAllSlicesResponse = {
  slices: slice[];
  totalSliceAmount: number;
};

class FirebaseSlices implements SlicesInterface {
  private firebaseApp: FirebaseApp;
  private firestore: Firestore;
  private projectsCollection: CollectionReference<Project>;

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.firebaseApp);
    this.projectsCollection = collection(
      this.firestore,
      'projects'
    ) as CollectionReference<Project>;
  }

  private async getSlicesCollection(projectId: string): Promise<CollectionReference<slice>> {
    const projectDocRef = doc(this.projectsCollection, projectId);
    return collection(projectDocRef, 'slices') as CollectionReference<slice>;
  }

  async createSlice(projectId: string, newSliceData: any): Promise<void> {
    const slicesCollection = await this.getSlicesCollection(projectId);

    try {
      await addDoc(slicesCollection, newSliceData);
    } catch (error) {
      console.error('Error adding new slice:', error);
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Custom error (${error.code}): ${error.message}`);
      }
    }
  }

  async getAllSlices(projectId: string): Promise<GetAllSlicesResponse> {
    const slicesCollection = await this.getSlicesCollection(projectId);

    try {
      const querySnapshot = await getDocs(query(slicesCollection, orderBy('received_date')));
      const slices: slice[] = querySnapshot.docs.map((doc) => {
        const { id, amount, ...otherData } = doc.data();
        return { id: doc.id, amount, ...otherData } as slice;
      });

      const totalSliceAmount = slices.reduce((total, slice) => total + slice.amount, 0);

      return { slices, totalSliceAmount };
    } catch (error) {
      console.error('Error Getting all slices:', error);
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Custom error (${error.code}): ${error.message}`);
      }
    }
  }

  async deleteSlice(
    projectId: string,
    sliceId: string,
    onDeleteCallback: () => void
  ): Promise<void> {
    const slicesCollection = await this.getSlicesCollection(projectId);
    const sliceDocRef = doc(slicesCollection, sliceId);

    try {
      await deleteDoc(sliceDocRef);
      onDeleteCallback();
    } catch (error) {
      console.error('Error deleting slice:', error);
      // Handle specific Firebase errors
      if (error instanceof FirebaseError) {
        throw error; // Re-throw Firebase errors
      } else {
        Sentry.captureException(error);
        throw new Error(`Custom error (${error.code}): ${error.message}`);
      }
    }
  }

  async updateSlice(
    projectId: string,
    sliceId: string,
    updatedSliceData: any,
    onUpdateCallback: () => void
  ): Promise<void> {
    const slicesCollection = await this.getSlicesCollection(projectId);
    const sliceDocRef = doc(slicesCollection, sliceId);

    try {
      await updateDoc(sliceDocRef, updatedSliceData);
      onUpdateCallback();
    } catch (error) {
      console.error('Error updating slice:', error);
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

export default FirebaseSlices;
