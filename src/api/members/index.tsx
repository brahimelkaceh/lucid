import { deepCopy } from 'src/utils/deep-copy';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  addDoc,
  limit,
  startAfter,
  orderBy,
  Query,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { firebaseConfig } from 'src/config';
import { firebaseApp } from 'src/libs/firebase';
import { Member } from 'src/types/members';

type GetMembersRequest = {
  filters?: {
    query?: string;
    email?: string;
  };
  page?: number | undefined;
  rowsPerPage?: number | undefined;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
};

type GetMembersResponse = Promise<{
  data: Member[];
  count: number;
  page: number; // Add this line
}>;

type GetMemberRequest = object;

type GetMemberResponse = Promise<Member>;

const firestore = getFirestore(firebaseApp);

const getAllMembers = async (request: GetMembersRequest = {}): GetMembersResponse => {
  const { filters, page = 1, rowsPerPage, sortBy, sortDir } = request;

  try {
    let memberQuery = query(collection(firestore, 'members')) as Query<Member>;

    if (filters) {
      if (filters.query) {
        const lowerCaseQuery = filters.query.toLowerCase();
        memberQuery = query(
          memberQuery,
          where('full_name', '>=', lowerCaseQuery),
          where('full_name', '<=', lowerCaseQuery + '\uf8ff')
        );
      }
    }

    // Sorting based on the chosen option (new or old)
    if (sortBy && sortDir) {
      memberQuery = query(memberQuery, orderBy(sortBy, sortDir));
    }

    // Pagination
    if (rowsPerPage && page) {
      const startAtDocument = (page - 1) * rowsPerPage;
      memberQuery = query(memberQuery, startAfter(startAtDocument), limit(rowsPerPage));
    }

    const snapshot: QuerySnapshot<Member> = await getDocs(memberQuery);

    const data = snapshot.docs.map((doc) => {
      const { id, ...otherData } = doc.data();
      return { id: doc.id, ...otherData } as Member;
    });

    return {
      data,
      count: snapshot.size,
      page,
    };
  } catch (error) {
    console.error('Error getting Members: ', error);
    throw error;
  }
};

const getMember = async (request?: GetMemberRequest): GetMemberResponse => {
  try {
    const doc = await getDocs(collection(firestore, 'members', 'id'));
    if (doc.docs.length > 0) {
      return deepCopy(doc.docs[0].data() as Member);
    } else {
      console.error('Member not found');
      throw new Error('Member not found');
    }
  } catch (error) {
    console.error('Error getting Member: ', error);
    throw error;
  }
};

const createMember = async (memberData: Member): Promise<void> => {
  try {
    const memberCollection = collection(firestore, 'members');
    await addDoc(memberCollection, memberData);
  } catch (error) {
    console.error('Error creating Member: ', error);
    throw error;
  }
};
const deleteMember = async (memberId: string): Promise<void> => {
  try {
    const memberDocRef = doc(firestore, 'members', memberId);
    await deleteDoc(memberDocRef);
    await getAllMembers();
  } catch (error) {
    console.error('Error deleting Member: ', error);
    throw error;
  }
};

export const allMembersApi = {
  getAllMembers,
  getMember,
  createMember,
  deleteMember,
};
