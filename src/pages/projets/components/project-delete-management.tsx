import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FirebaseProjects from 'src/firebaseServices/projets';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from './delete-confirmation-modal';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import { CardActionArea, CardActions } from '@mui/material';

interface ProjectDeleteManageProps {
  projectId: string;
}

const ProjectDeleteManage: FC<ProjectDeleteManageProps> = ({ projectId, ...props }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };
  // Replace this with your actual delete function
  const handleDelete = async (projectId: string | undefined) => {
    // Implement the delete logic here
    try {
      const firebaseDeleteProject = new FirebaseProjects();
      await firebaseDeleteProject.deleteProject(projectId ?? ' ');
      toast.success('Le project a été supprimé avec succès!');
      router.replace(paths.dashboard.projets.index);
    } catch (error) {
      console.error('Error deleting member: ', error);
      toast.error('Échec de la suppression du project. Veuillez réessayer.');
    }
  };

  return (
    <CardActions
      sx={{ p: 4 }}
      {...props}
    >
      <Button
        color="error"
        variant="outlined"
        onClick={() => handleDeleteClick()} // Replace handleDelete with your actual delete function
      >
        Supprimer le projet
      </Button>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
        message="Êtes vous sûr de vouloir supprimer le projet? Cette action sera irréversible."
        id={projectId}
      />
    </CardActions>
  );
};
export default ProjectDeleteManage;
