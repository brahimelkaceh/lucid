import FirebaseProjects from '.';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  getDocs: jest.fn(),
}));

describe('FirebaseProjects', () => {
  let firebaseProjects: any;

  beforeEach(() => {
    jest.clearAllMocks();
    firebaseProjects = new FirebaseProjects();
  });

  describe('getAllProjects', () => {
    it('should fetch all projects without filters', async () => {
      const mockQuerySnapshot = {
        docs: [{ id: '1', data: () => ({ projectName: 'Project 1' }) }],
        size: 1,
      };
      jest
        .spyOn(firebaseProjects, 'getAllProjects')
        .mockImplementation(async () => mockQuerySnapshot);

      const result = await firebaseProjects.getAllProjects();

      expect(result.projects.length).toBe(1);
      expect(result.count).toBe(1);
    });

    it('should fetch projects with filters', async () => {
      const mockQuerySnapshot = {
        docs: [{ id: '1', data: () => ({ projectName: 'Filtered Project' }) }],
        size: 1,
      };
      jest
        .spyOn(firebaseProjects, 'getAllProjects')
        .mockImplementation(async () => mockQuerySnapshot);

      const filters = { query: 'filtered' };
      const result = await firebaseProjects.getAllProjects({ filters });

      expect(result.projects.length).toBe(1);
      expect(result.count).toBe(1);
    });

    it('should handle errors gracefully', async () => {
      jest.spyOn(firebaseProjects, 'getAllProjects').mockImplementation(async () => {
        throw new Error('Mocked error');
      });

      const result = await firebaseProjects.getAllProjects();

      expect(result.projects).toEqual([]);
      expect(result.count).toBe(0);
    });
  });

  // Add similar tests for createProject, updateProject, and deleteProject methods
});
