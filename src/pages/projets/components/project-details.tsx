import type { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { LinearProgress, Typography } from '@mui/material';
import numeral from 'numeral';
import type { Project } from 'src/types/project';
import { ProjectDeleteManage } from './project-delete-management';

interface ProjectDetailsProps {
  project: Project | null;
  loading: boolean;
}

export const ProjectDetails: FC<ProjectDetailsProps> = ({ project, loading, ...props }) => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const totalAmount = project ? numeral(project.amount).format(`0,0.00`) : 'N/A';

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card {...props}>
      {loading && <LinearProgress />}
      <CardHeader title="Détails du projet" />
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Nom projet"
          value={project ? project.project_name : 'N/A'}
        />
        <PropertyListItem
          align={align}
          divider
          label="Email de contact"
          value={project ? project.email : 'N/A'}
        />
        <PropertyListItem
          align={align}
          divider
          label="Bailleurs de fond"
        >
          {project?.financial_backer.map((backer, index) => (
            <Typography
              key={index}
              color="text.secondary"
              variant="body2"
            >
              - {backer}
            </Typography>
          ))}
          {!project?.financial_backer.length && (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              - N/A
            </Typography>
          )}
        </PropertyListItem>
        <PropertyListItem
          align={align}
          divider
          label="Bénéficiaires"
        >
          {project?.beneficiaries.map((beneficiary, index) => (
            <Typography
              key={index}
              color="text.secondary"
              variant="body2"
            >
              - {beneficiary}
            </Typography>
          ))}
          {!project?.beneficiaries.length && (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              - N/A
            </Typography>
          )}
        </PropertyListItem>
        <PropertyListItem
          align={align}
          label="Montant global"
          value={`MAD ${totalAmount}`}
          divider
        />
      </PropertyList>
      {project && <ProjectDeleteManage projectId={project.id} />}
    </Card>
  );
};
