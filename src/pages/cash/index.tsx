import type { NextPage } from 'next';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import NewProject from 'src/sections/components/forms/new-project';
import { Previewer } from 'src/sections/components/previewer';
import NewCustomerForm from 'src/sections/components/forms/new-customer';
import NewInstallment from 'src/sections/components/forms/new-installment';
import { SeverityPill } from 'src/components/severity-pill';
import NewMemberForm from 'src/sections/components/forms/new-member';
import NewSalary from 'src/sections/components/forms/new-salary';
import NewPayement from 'src/sections/components/forms/new-paiement';
import { Divider } from '@mui/material';
import { OrderListContainer } from 'src/sections/dashboard/order/order-list-container';
import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDialog } from 'src/hooks/use-dialog';
import { OrderListSearch } from '../membres/components/member-list-search';
import { OrderListTable } from '../membres/components/member-list-table';
import { OrderDrawer } from '../membres/components/member-drawer';
import { Customer } from 'src/types/customer';
import { useMounted } from 'src/hooks/use-mounted';
import { customersApi } from 'src/api/customers';
import NewCash from 'src/sections/components/forms/new-cash';
import { CashDrawer } from './components/chash-drawer';
import { CashStats } from './components/cash-stats';
import { CashListSearch } from './components/cash-list-search';
import { CashListTable } from './components/cash-list-table';
import NewOutCash from 'src/sections/components/forms/new-out-cash';
import { TableCash } from './components/cash-table';

interface Filters {
  query?: string;
  status?: string;
}
type SortDir = 'asc' | 'desc';

interface MemberSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}
const useMembersSearch = () => {
  const [state, setState] = useState<MemberSearchState>({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback((sortDir: SortDir): void => {
    setState((prevState) => ({
      ...prevState,
      sortDir,
    }));
  }, []);

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};
interface MemberStoreState {
  members: Customer[];
  membersCount: number;
}
const useMembersStore = (searchState: MemberSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<MemberStoreState>({
    members: [],
    membersCount: 0,
  });

  const handleOrdersGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomers(searchState);

      if (isMounted()) {
        setState({
          members: response.data,
          membersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleOrdersGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};
const useCurrentOrder = (members: Customer[], memberId?: string): Customer | undefined => {
  return useMemo((): Customer | undefined => {
    if (!memberId) {
      return undefined;
    }

    return members.find((member) => member.id === memberId);
  }, [members, memberId]);
};

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const membersSearch = useMembersSearch();
  const membersStore = useMembersStore(membersSearch.state);
  const dialog = useDialog<string>();
  const currentOrder = useCurrentOrder(membersStore.members, dialog.data);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted successfully');
  };
  const settings = useSettings();

  usePageView();
  const handleOrderOpen = useCallback(
    (orderId: string): void => {
      // Close drawer if is the same order

      if (dialog.open && dialog.data === orderId) {
        dialog.handleClose();
        return;
      }

      dialog.handleOpen(orderId);
    },
    [dialog]
  );
  return (
    <Box
      component="main"
      ref={rootRef}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        ref={rootRef}
        sx={{
          bottom: 0,
          display: 'flex',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <OrderListContainer open={dialog.open}>
          <Box sx={{ p: 1 }}>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{ m: 2 }}
            >
              <div>
                <Typography variant="h4">Gestion de caisse</Typography>
              </div>
            </Stack>
          </Box>
          <Container maxWidth={settings.stretch ? false : 'xl'}>
            <CashStats />
            <Grid
              container
              xs={12}
              md={12}
              spacing={0}
              pb={3}
              maxWidth="xl"
            >
              <Grid
                xs={12}
                md={12}
                lg={6}
              >
                <Container
                  sx={{
                    paddingX: ' 0 !important',
                  }}
                >
                  <Previewer title="Nouvelle Entrée">
                    <NewCash onSubmit={handleSubmit}></NewCash>
                  </Previewer>
                </Container>
              </Grid>
              <Grid
                xs={12}
                md={12}
                lg={6}
              >
                <Container
                  sx={{
                    paddingl: ' 0 !important',
                  }}
                >
                  <Previewer title="Nouvelle Sortie">
                    <NewOutCash onSubmit={handleSubmit}></NewOutCash>
                  </Previewer>
                </Container>
              </Grid>
            </Grid>
          </Container>
          <Divider />
          <TableCash />
          <Divider />
        </OrderListContainer>
        <CashDrawer
          container={rootRef.current}
          onClose={dialog.handleClose}
          open={dialog.open}
          member={currentOrder}
        />
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
