import { slice } from 'src/types/slice';

// ! Define the shape of the response for getting slices
type GetAllSlicesResponse = {
  slices: slice[];
  totalSliceAmount: number;
};

// ! Interface defining the shape of methods for interacting with slices
interface SlicesInterface {
  // ! Create a new slice
  createSlice(projectId: string, newSliceData: any): Promise<void>;

  // ! Get all slices by project ID
  getAllSlices(projectId: string): Promise<GetAllSlicesResponse>;

  // ! Delete a slice by project ID and slice ID
  deleteSlice(projectId: string, sliceId: string, onDeleteCallback: () => void): Promise<void>;

  // ! Update an existing slice within a project
  updateSlice(
    projectId: string,
    sliceId: string,
    updatedSliceData: any,
    onUpdateCallback: () => void
  ): Promise<void>;
}

export default SlicesInterface;
