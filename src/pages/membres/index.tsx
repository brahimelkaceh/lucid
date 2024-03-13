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
import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { OrderListContainer } from 'src/sections/dashboard/order/order-list-container';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { Member } from 'src/types/members';
import MemberDrawer from './components/member-drawer';
import MemberListSearch from './components/member-list-search';
import MemberListTable from './components/member-list-table';
import FirebaseMembers from 'src/firebaseServices/membres';
import membersData from './data';
interface Filters {
  query?: string;
  status?: string;
}
type SortDir = 'asc' | 'desc';

interface MemberSearchState {
  filters: Filters;
  page: number | undefined;
  rowsPerPage: number | undefined;
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
    sortBy: 'full_name',
    sortDir: 'asc',
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
    async (event: MouseEvent<HTMLButtonElement> | null, page: number): Promise<void> => {
      console.log(page);

      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [setState]
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 5),
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
  members: Member[];
  membersCount: number;
}

const useMembersStore = (searchState: MemberSearchState) => {
  const isMounted = useMounted();

  const [state, setState] = useState<MemberStoreState>({
    members: [],
    membersCount: 0,
  });

  const handleMembersGet = useCallback(async () => {
    const firebaseMembers = new FirebaseMembers();

    try {
      const response = membersData;
      console.log(response);

      if (isMounted()) {
        setState({
          members: response.members,
          membersCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  const handleMemberDelete = useCallback(() => {
    handleMembersGet();
  }, [handleMembersGet]);
  const handleMemberUpdate = useCallback(() => {
    handleMembersGet();
  }, [handleMembersGet]);
  useEffect(() => {
    handleMembersGet();
  }, [handleMembersGet, searchState]);

  return {
    ...state,
    onDeleteMember: handleMemberDelete,
    onUpdateMember: handleMemberUpdate,
  };
};

const useCurrentMember = (members: Member[], id?: string): Member | undefined => {
  return useMemo((): Member | undefined => {
    if (!id) {
      return undefined;
    }

    return members.find((member) => member.id === id);
  }, [members, id]);
};

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const membersSearch = useMembersSearch();
  const membersStore = useMembersStore(membersSearch.state);
  const dialog = useDialog<string>();
  const currentMember = useCurrentMember(membersStore.members, dialog.data);

  usePageView();

  const handleMemberOpen = useCallback(
    (memberId: string): void => {
      // Close drawer if is the same order

      if (dialog.open && dialog.data === memberId) {
        dialog.handleClose();
        return;
      }

      dialog.handleOpen(memberId);
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
                sx={{ mx: 5 }}
              >
                <div>
                  <Typography variant="h4">Gestion membres</Typography>
                </div>
                <Button
                  component={RouterLink}
                  href={paths.dashboard.membres.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Nouveau
                </Button>
              </Stack>
            </Box>
            <Divider />

            <Divider />
            <MemberListSearch
              onFiltersChange={membersSearch.handleFiltersChange}
              // onSortChange={membersSearch.handleSortChange}
              // sortBy={membersSearch.state.sortBy}
              // sortDir={membersSearch.state.sortDir}
            />
            <Divider />
            <MemberListTable
              count={membersStore.membersCount}
              members={membersStore.members}
              onPageChange={membersSearch.handlePageChange}
              onRowsPerPageChange={membersSearch.handleRowsPerPageChange}
              onSelect={handleMemberOpen}
              page={membersSearch.state.page}
              rowsPerPage={membersSearch.state.rowsPerPage}
              onDeleteMember={membersStore.onDeleteMember}
            />
          </OrderListContainer>
          <MemberDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            member={currentMember}
            onUpdateMember={membersStore.onUpdateMember}
          />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
