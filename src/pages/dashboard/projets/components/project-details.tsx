import { useEffect, type FC, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { Scrollbar } from 'src/components/scrollbar';
import PaymentHistoryTableRow from './PaymentHistoryTableRow';
import { Project } from 'src/types/project';
import FirebaseProjects from 'src/firebaseServices/projets';
import { slice } from 'src/types/slice';

interface ProjectDetailsProps {
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  project: Project;
}

export const ProjectDetails: FC<ProjectDetailsProps> = (props) => {
  const { onEdit, project } = props;
  const [slices, setSlices] = useState<slice>();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';

  const handleSlicesGet = async (project_id: string) => {
    const firebaseSlicese = new FirebaseProjects();

    try {
      const response = await firebaseSlicese.getAllSlices(project_id);
      // console.log(response);

      setSlices(response.slices as unknown as slice);
      // setProjects(response.map(({ id, project_name }) => ({ text: project_name, value: id })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    project.id && handleSlicesGet(project.id);
  }, [project]);
  const handleSliceDelete = useCallback(() => {
    project.id && handleSlicesGet(project.id);
  }, [handleSlicesGet]);
  const handleSliceUpdate = useCallback(() => {
    project.id && handleSlicesGet(project.id);
  }, [handleSlicesGet]);
  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">Détails du projet</Typography>
          <Button
            color="warning"
            variant="outlined"
            onClick={onEdit}
            size="small"
            startIcon={
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            }
          >
            Modifier
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Nom projet"
            value={project.project_name}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Email de contact"
            value={project.email ?? '--'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Bailleurs de fond"
          >
            {project?.financial_backer.length > 0 ? (
              project?.financial_backer?.map((financial, i) => {
                return (
                  <Typography
                    key={i}
                    color="text.secondary"
                    variant="body2"
                  >
                    - {financial}
                  </Typography>
                );
              })
            ) : (
              <Typography
                color="text.secondary"
                variant="body2"
              >
                --
              </Typography>
            )}
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Bénéficiairs"
          >
            {project?.beneficiaries.length > 0 ? (
              project?.beneficiaries?.map((beneficary, i) => {
                return (
                  <Typography
                    key={i}
                    color="text.secondary"
                    variant="body2"
                  >
                    - {beneficary}
                  </Typography>
                );
              })
            ) : (
              <Typography
                color="text.secondary"
                variant="body2"
              >
                --
              </Typography>
            )}
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Montant global"
            value={'MAD ' + project.amount + '.00'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Montant reçu"
            value={'MAD ' + project.amount + '.00'}
          />
        </PropertyList>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">Historique des tranches de paiement</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slices &&
                slices?.map((slice: slice, i: number) => (
                  <PaymentHistoryTableRow
                    key={i}
                    {...slice}
                    onDelete={handleSliceDelete}
                    onUpdate={handleSliceUpdate}
                    projectId={project?.id}
                    id={slice.id} // Make sure to include the id property
                  />
                ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};

ProjectDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  project: PropTypes.object,
};
