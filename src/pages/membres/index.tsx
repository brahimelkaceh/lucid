import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NextPage } from 'next';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { ordersApi } from 'src/api/orders';
import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { OrderListContainer } from 'src/sections/dashboard/order/order-list-container';
import type { Order } from 'src/types/order';
import type { Customer } from 'src/types/customer';
import { OrderListSearch } from './components/order-list-search';
import { OrderListTable } from './components/order-list-table';
import { OrderDrawer } from './components/order-drawer';
import { customersApi } from 'src/api/customers';

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
    <>
      <Seo title="Revenus: Gestion membres" />
      <Divider />
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
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">Gestion membres</Typography>
                </div>
              </Stack>
            </Box>
            <Divider />
            <OrderListSearch
              onFiltersChange={membersSearch.handleFiltersChange}
              onSortChange={membersSearch.handleSortChange}
              sortBy={membersSearch.state.sortBy}
              sortDir={membersSearch.state.sortDir}
            />
            <Divider />
            <OrderListTable
              count={membersStore.membersCount}
              items={membersStore.members}
              onPageChange={membersSearch.handlePageChange}
              onRowsPerPageChange={membersSearch.handleRowsPerPageChange}
              onSelect={handleOrderOpen}
              page={membersSearch.state.page}
              rowsPerPage={membersSearch.state.rowsPerPage}
            />
          </OrderListContainer>
          <OrderDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            member={currentOrder}
          />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
