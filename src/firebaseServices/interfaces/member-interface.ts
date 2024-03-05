import { Member } from 'src/types/members';

interface GetMembersRequest {
  filters?: {
    query?: string;
    status?: string;
  };
  page?: number | undefined;
  rowsPerPage?: number | undefined;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

interface GetMembersResponse {
  members: Member[];
  count: number;
}

interface MembersInterface {
  getAllMembers(request?: GetMembersRequest): Promise<GetMembersResponse>;
  createMember(newMember: Member): Promise<void>;
  updateMember(memberId: string, updatedData: any, onUpdateCallback: () => void): Promise<void>;
  deleteMember(memberId: string, onDeleteCallback: () => void): Promise<void>;
}

export default MembersInterface;
