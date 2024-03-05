import type { FC } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { MoreMenu } from 'src/components/more-menu';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill, SeverityPillColor } from 'src/components/severity-pill';
import FolderIcon from '@untitled-ui/icons-react/build/esm/Folder';
import { Avatar } from '@mui/material';

interface Product {
  id: string;
  category: string;
  image?: string;
  name: string;
  sales: number;
  color: string;
  status: string;
}

interface EcommerceProductsProps {
  products: Product[];
}

export const EcommerceProducts: FC<EcommerceProductsProps> = (props) => {
  const { products } = props;

  return (
    <Card sx={{ minWidth: 300, maxHeight: '72vh', overflowY: 'scroll' }}>
      <Table>
        <TableBody>
          {products.map((product, index) => {
            return (
              <TableRow
                hover
                key={product.id}
              >
                <TableCell>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                  >
                    <Avatar
                      sx={{
                        alignItems: 'center',
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.50',
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? 'neutral.100' : 'neutral.700',
                        borderRadius: 1,
                        display: 'flex',
                        height: 48,
                        justifyContent: 'center',
                        width: 48,
                      }}
                    >
                      <SvgIcon>
                        <FolderIcon />
                      </SvgIcon>
                    </Avatar>
                    <div>
                      <Typography variant="subtitle2">{product.name}</Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {product.category}
                      </Typography>
                    </div>
                  </Stack>
                </TableCell>

                <TableCell align="right">
                  <SeverityPill color={product.color as SeverityPillColor}>
                    {product.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

EcommerceProducts.propTypes = {
  products: PropTypes.array.isRequired,
};
