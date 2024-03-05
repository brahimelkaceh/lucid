import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, ListItem, SvgIcon, TableHead } from '@mui/material';
import { Customer } from 'src/types/customer';
import { format } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Project } from 'src/types/project';
import FirebaseProjects from 'src/firebaseServices/projets';
import toast from 'react-hot-toast';
import Edit from '@mui/icons-material/Edit';

interface ProjectListTableProps {
  count?: number;
  items?: Project[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (ProjectId: string) => void;
  onDelete?: (ProjectId: string) => void;
  page?: number;
  rowsPerPage?: number;
  onDeleteProject?: () => void;
}

export const ProjectListTable: FC<ProjectListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0,
    onDelete,
    onDeleteProject = () => {},
  } = props;

  const handleDelete = async (ProjectId: string) => {
    try {
      const firebaseDeleteProject = new FirebaseProjects();
      await firebaseDeleteProject.deleteProject(ProjectId, onDeleteProject);
      onDelete?.(ProjectId);
      toast.success('Le project a été supprimé avec succès!');
    } catch (error) {
      console.error('Error deleting member: ', error);
      toast.error('Échec de la suppression du project. Veuillez réessayer.');
    }
  };
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom projet</TableCell>
            <TableCell>Email de contact</TableCell>
            <TableCell>Bailleur de fond</TableCell>
            <TableCell>Bénéficiaire</TableCell>
            <TableCell>Montant global</TableCell>
            <TableCell width={'10%'}>Détails</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((project) => {
            const totalAmount = numeral(project.amount).format(`0,0.00`);

            return (
              <TableRow
                hover
                key={project.id}
              >
                <TableCell>
                  <Typography variant="subtitle2">
                    {project.project_name.charAt(0).toUpperCase() + project.project_name.slice(1)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{project.email}</Typography>
                </TableCell>
                <TableCell>
                  {project?.financial_backer?.slice(-2).map((financial, i) => {
                    return (
                      <Typography
                        key={i}
                        color="text.secondary"
                        variant="body2"
                      >
                        - {financial}
                      </Typography>
                    );
                  })}
                  {project?.financial_backer.length <= 0 && (
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      --
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {project?.beneficiaries?.slice(-2).map((beneficary, i) => {
                    return (
                      <Typography
                        key={i}
                        color="text.secondary"
                        variant="body2"
                      >
                        - {beneficary}
                      </Typography>
                    );
                  })}
                  {project?.beneficiaries.length <= 0 && (
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      --
                    </Typography>
                  )}
                </TableCell>

                <TableCell>
                  <Typography variant="body2">MAD {totalAmount}</Typography>
                </TableCell>

                <TableCell>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => project.id && handleDelete(project.id)}
                  >
                    <SvgIcon>
                      <DeleteOutlineIcon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton
                    color="warning"
                    size="small"
                    onClick={() => project.id && onSelect?.(project.id)}
                  >
                    <SvgIcon>
                      <Edit />
                    </SvgIcon>
                  </IconButton>
                  <IconButton
                    size="small"
                    color="info"
                    onClick={() => project.id && onSelect?.(project.id)}
                  >
                    <SvgIcon>
                      <ArrowRightIcon />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Lignes par page"
      />
    </div>
  );
};

ProjectListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
