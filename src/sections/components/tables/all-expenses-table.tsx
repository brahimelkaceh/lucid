import { useState, type FC, useCallback, ChangeEvent } from 'react';
import numeral from 'numeral';
import { format, subDays, subHours } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import { Scrollbar } from 'src/components/scrollbar';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { current } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { Typography } from '@mui/material';

const tabs = [
  {
    label: 'Bailleur de fond 1',
    value: 'in',
  },
  {
    label: 'Bailleur de fond 2',
    value: 'outs',
  },
];

const AllExpenses: FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('in');
  const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
    setCurrentTab(value);
  }, []);
  const chartSeries = [16213.2, 9626.8, 10076.81];
  const labels = ['Projet 1', 'Projet 2', 'Projet 3'];

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Card>
        <Tabs
          indicatorColor="primary"
          scrollButtons="auto"
          textColor="primary"
          onChange={handleTabsChange}
          value={currentTab}
          sx={{ px: 3 }}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider />
        <Stack
          component="ul"
          spacing={1}
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
          }}
        >
          {chartSeries.map((item, index) => {
            const amount = numeral(item).format('0,0.00');

            return (
              <>
                <Stack
                  alignItems="center"
                  component="li"
                  direction="row"
                  key={index}
                  spacing={2}
                  py={1}
                >
                  <Box
                    sx={{
                      // backgroundColor: chartOptions.colors![index],
                      borderRadius: '4px',
                      height: 16,
                      width: 16,
                    }}
                  />
                  <Typography
                    sx={{ flexGrow: 1 }}
                    variant="subtitle2"
                  >
                    {labels[index]}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    MAD {amount}
                  </Typography>
                </Stack>
                <Divider />
              </>
            );
          })}
        </Stack>
      </Card>
    </Box>
  );
};

export default AllExpenses;
