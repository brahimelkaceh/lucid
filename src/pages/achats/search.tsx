import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import FilterFunnel01Icon from '@untitled-ui/icons-react/build/esm/FilterFunnel01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { invoicesApi } from 'src/api/invoices';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { InvoiceListContainer } from 'src/sections/dashboard/invoice/invoice-list-container';
import { InvoiceListSidebar } from 'src/sections/dashboard/invoice/invoice-list-sidebar';
import { InvoiceListSummary } from 'src/sections/dashboard/invoice/invoice-list-summary';
import { InvoiceListTable } from 'src/sections/dashboard/invoice/invoice-list-table';
import type { Invoice, InvoiceStatus } from 'src/types/invoice';
import Link from 'next/link';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import PurchaseListTable from './components/purchase-list-table';
import PurchaseListSidebar from './components/purchase-list-sidebar';
import PurchaseListSummary from './components/purchase-list-summary';

interface Filters {
  customers?: string[];
  endDate?: Date;
  query?: string;
  startDate?: Date;
  status?: InvoiceStatus;
}

interface InvoicesSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
}

const useInvoicesSearch = () => {
  const [state, setState] = useState<InvoicesSearchState>({
    filters: {
      customers: [],
      endDate: undefined,
      query: '',
      startDate: undefined,
    },
    page: 0,
    rowsPerPage: 5,
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
      page: 0,
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
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

interface InvoicesStoreState {
  invoices: Invoice[];
  invoicesCount: number;
}

const useInvoicesStore = (searchState: InvoicesSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<InvoicesStoreState>({
    invoices: [],
    invoicesCount: 0,
  });

  const handleInvoicesGet = useCallback(async () => {
    try {
      const response = await invoicesApi.getInvoices(searchState);

      if (isMounted()) {
        setState({
          invoices: response.data,
          invoicesCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleInvoicesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const invoicesSearch = useInvoicesSearch();
  const invoicesStore = useInvoicesStore(invoicesSearch.state);
  const [group, setGroup] = useState<boolean>(true);
  const [openSidebar, setOpenSidebar] = useState<boolean>(lgUp);

  usePageView();

  const handleGroupChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setGroup(event.target.checked);
  }, []);

  const handleFiltersToggle = useCallback((): void => {
    setOpenSidebar((prevState) => !prevState);
  }, []);

  const handleFiltersClose = useCallback((): void => {
    setOpenSidebar(false);
  }, []);

  return (
    <>
      <Seo title=" Factures" />
      <Divider />
      <Box
        component="main"
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
          <PurchaseListSidebar
            container={rootRef.current}
            filters={invoicesSearch.state.filters}
            group={group}
            onFiltersChange={invoicesSearch.handleFiltersChange}
            onClose={handleFiltersClose}
            onGroupChange={handleGroupChange}
            open={openSidebar}
          />
          <InvoiceListContainer open={openSidebar}>
            <Stack spacing={4}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <div>
                  <Typography variant="h4">Achats</Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={
                      <SvgIcon>
                        <FilterFunnel01Icon />
                      </SvgIcon>
                    }
                    onClick={handleFiltersToggle}
                  >
                    Recherche
                  </Button>
                </Stack>
              </Stack>
              <PurchaseListSummary />
              <PurchaseListTable
                count={invoicesStore.invoicesCount}
                group={group}
                items={invoicesStore.invoices}
                onPageChange={invoicesSearch.handlePageChange}
                onRowsPerPageChange={invoicesSearch.handleRowsPerPageChange}
                page={invoicesSearch.state.page}
                rowsPerPage={invoicesSearch.state.rowsPerPage}
              />
            </Stack>
          </InvoiceListContainer>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
