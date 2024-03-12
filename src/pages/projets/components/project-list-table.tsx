import type { ChangeEvent, FC, MouseEvent } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/components/router-link';
import { Scrollbar } from 'src/components/scrollbar';
import { paths } from 'src/paths';
import { Project } from 'src/types/project';

interface ProjectListTableProps {
  count?: number;
  items?: Project[];
  onDeselectAll?: () => void;
  onDeselectOne?: (customerId: string) => void;
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectAll?: () => void;
  onSelectOne?: (customerId: string) => void;
  page?: number;
  rowsPerPage?: number;
  selected?: string[];
}

const ProjectListTable: FC<ProjectListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Box sx={{ position: 'relative' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nom projet</TableCell>
              <TableCell>Email de contact</TableCell>
              <TableCell>Bailleur de fond</TableCell>
              <TableCell>Bénéficiaire</TableCell>
              <TableCell>Montant global</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          href={paths.dashboard.projets.details}
                          variant="subtitle2"
                        >
                          {project.project_name}
                        </Link>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell> {project.email}</TableCell>
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
                  <TableCell align="right">
                    <Link
                      component={RouterLink}
                      href={paths.dashboard.projets.details.replace(':projetId', project?.id)}
                    >
                      <IconButton color="info">
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};
export default ProjectListTable;
ProjectListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
