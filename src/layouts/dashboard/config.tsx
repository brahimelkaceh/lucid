import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import SvgIcon from '@mui/material/SvgIcon';

import AlignLeft02Icon from 'src/icons/untitled-ui/duocolor/align-left-02';
import BarChartSquare02Icon from 'src/icons/untitled-ui/duocolor/bar-chart-square-02';
import Building04Icon from 'src/icons/untitled-ui/duocolor/building-04';
import CalendarIcon from 'src/icons/untitled-ui/duocolor/calendar';
import CheckDone01Icon from 'src/icons/untitled-ui/duocolor/check-done-01';
import CreditCard01Icon from 'src/icons/untitled-ui/duocolor/credit-card-01';
import CurrencyBitcoinCircleIcon from 'src/icons/untitled-ui/duocolor/currency-bitcoin-circle';
import File01Icon from 'src/icons/untitled-ui/duocolor/file-01';
import GraduationHat01Icon from 'src/icons/untitled-ui/duocolor/graduation-hat-01';
import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile';
import LayoutAlt02Icon from 'src/icons/untitled-ui/duocolor/layout-alt-02';
import LineChartUp04Icon from 'src/icons/untitled-ui/duocolor/line-chart-up-04';
import Lock01Icon from 'src/icons/untitled-ui/duocolor/lock-01';
import LogOut01Icon from 'src/icons/untitled-ui/duocolor/log-out-01';
import Mail03Icon from 'src/icons/untitled-ui/duocolor/mail-03';
import Mail04Icon from 'src/icons/untitled-ui/duocolor/mail-04';
import MessageChatSquareIcon from 'src/icons/untitled-ui/duocolor/message-chat-square';
import ReceiptCheckIcon from 'src/icons/untitled-ui/duocolor/receipt-check';
import Share07Icon from 'src/icons/untitled-ui/duocolor/share-07';
import ShoppingBag03Icon from 'src/icons/untitled-ui/duocolor/shopping-bag-03';
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01';
import Truck01Icon from 'src/icons/untitled-ui/duocolor/truck-01';
import Upload04Icon from 'src/icons/untitled-ui/duocolor/upload-04';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import XSquareIcon from 'src/icons/untitled-ui/duocolor/x-square';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import GroupIcon from '@mui/icons-material/Group';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ConstructionIcon from '@mui/icons-material/Construction';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <DashboardIcon />
              </SvgIcon>
            ),
          },
        ],
      },
      {
        items: [
          {
            title: t(tokens.nav.revenus),
            path: paths.dashboard.revenus.index,
            icon: (
              <SvgIcon fontSize="small">
                <CurrencyExchangeIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.projects_management),
                path: paths.dashboard.projets.index,
              },

              {
                title: t(tokens.nav.members_management),
                path: paths.dashboard.membres.index,
              },

              {
                title: t(tokens.nav.clients_management),
                path: paths.dashboard.clients.index,
              },
              {
                title: t(tokens.nav.invoices_management),
                path: paths.dashboard.invoices.index,
              },
            ],
          },
        ],
      },
      {
        subheader: 'Charge & Dépenses',
        items: [
          {
            title: t(tokens.nav.salary),
            path: paths.dashboard.salary.index,
            icon: (
              <SvgIcon fontSize="small">
                <GroupIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.utilities),
            path: paths.dashboard.utilities.index,
            icon: (
              <SvgIcon fontSize="small">
                <ConstructionIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.achats),
            path: paths.dashboard.achats.index,
            icon: (
              <SvgIcon fontSize="small">
                <LocalGroceryStoreIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.expenses),
            path: paths.dashboard.expenses.index,
            icon: (
              <SvgIcon fontSize="small">
                <RequestQuoteIcon />
              </SvgIcon>
            ),
          },
        ],
      },
      {
        subheader: 'Chash Management',
        items: [
          {
            title: t(tokens.nav.cash),
            path: paths.dashboard.cash.index,
            icon: (
              <SvgIcon fontSize="small">
                <CardMembershipIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};
