// ProjectsTable.tsx
import React from 'react';
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Link,
} from '@mui/material';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Scrollbar } from 'src/components/scrollbar';
import numeral from 'numeral';
import type { Project } from '../index';
import { format } from 'date-fns';

interface ProjectsTableProps {
  projects: Project[];
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={2}
          sx={{ p: 2 }}
        >
          <OutlinedInput
            placeholder="Rechercher"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Nom projet</TableCell>
                <TableCell>Bailleur de fond</TableCell>
                <TableCell>Bénéficiaire</TableCell>
                <TableCell>Montant global</TableCell>
                <TableCell>Paiements projets</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => {
                const location = `${project.city}, ${project.state}, ${project.country}`;
                const totalSpent = numeral(project.totalSpent).format(`${project.currency}0,0.00`);
                const date = format(project.updatedAt, 'dd MMM, yyyy');

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
                            variant="subtitle2"
                          >
                            {project.name}
                          </Link>
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>{project.totalOrders}</TableCell>
                    <TableCell>{totalSpent}</TableCell>
                    <TableCell>{totalSpent}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell align="right">
                      <IconButton color="warning">
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton color="error">
                        <SvgIcon>
                          <DeleteOutlineIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton color="info">
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
        </Scrollbar>
        <TablePagination
          component="div"
          count={projects.length}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Lignes par page"
        />
      </Card>
    </Box>
  );
};

export default ProjectsTable;
