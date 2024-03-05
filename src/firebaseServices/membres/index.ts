import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  Query,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  Firestore,
  CollectionReference,
} from 'firebase/firestore';
import { firebaseConfig } from 'src/config';
import MembersInterface from '../interfaces/member-interface';
import { Member } from 'src/types/members';
import { applyPagination } from 'src/utils/apply-pagination';

type GetMembersRequest = {
  filters?: {
    query?: string;
    status?: string;
  };
  page?: number;
  rowsPerPage?: number | undefined;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetMembersResponse = {
  members: Member[];
  count: number;
};

class FirebaseMembers implements MembersInterface {
  private firebaseApp: FirebaseApp;
  private firestore: Firestore;
  private membersCollection: CollectionReference<Member>;

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.firestore = getFirestore(this.firebaseApp);
    this.membersCollection = collection(this.firestore, 'members') as CollectionReference<Member>;
  }

  async getAllMembers(request: GetMembersRequest = {}): Promise<GetMembersResponse> {
    const { filters, page, rowsPerPage = 5, sortBy, sortDir } = request;

    try {
      let memberQuery: Query<Member> = query(this.membersCollection);

      if (filters) {
        if (filters.query) {
          const lowerCaseQuery = filters.query.toLowerCase();
          memberQuery = query(
            this.membersCollection,
            where('full_name', '>=', lowerCaseQuery),
            where('full_name', '<=', lowerCaseQuery + '\uf8ff')
          );
        }

        if (filters.status && filters.status.length > 0) {
          memberQuery = query(this.membersCollection, where('status', 'in', filters.status));
        }
      }

      memberQuery = query(memberQuery, orderBy('full_name', sortDir));

      const querySnapshot = await getDocs(memberQuery);
      const members = querySnapshot.docs.map((doc) => {
        const { id, ...otherData } = doc.data();
        return { id: doc.id, ...otherData } as Member;
      });

      const response: GetMembersResponse = {
        members,
        count: querySnapshot.size,
      };
      if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
        response.members = applyPagination(response.members, page, rowsPerPage);
      }
      return response;
    } catch (error) {
      console.error('Error getting members: ', error);
      // You may want to handle the error gracefully, returning a default value or logging it.
      return {
        members: [],
        count: 0,
      };
    }
  }
  async createMember(newMember: Member): Promise<void> {
    console.log(newMember);

    try {
      await addDoc(this.membersCollection, newMember);
    } catch (error) {
      console.error('Error adding new member: ', error);
      throw error;
    }
  }
  async updateMember(
    memberId: string,
    updatedData: any,
    onUpdateCallback: () => void
  ): Promise<void> {
    try {
      const memberDocRef = doc(this.membersCollection, memberId);
      await updateDoc(memberDocRef, updatedData);
      onUpdateCallback();
    } catch (error) {
      console.error('Error updating member: ', error);
      throw error;
    }
  }
  async deleteMember(memberId: string, onDeleteCallback: () => void): Promise<void> {
    try {
      const memberDocRef = doc(this.membersCollection, memberId);
      await deleteDoc(memberDocRef);
      onDeleteCallback();
    } catch (error) {
      console.error('Error deleting member: ', error);
      throw error;
    }
  }
}

export default FirebaseMembers;
