export interface Member {
  id: string;
  full_name: string;
  email?: string;
  amount?: number | null | '';
  payment_method?: number | null;
  payment_date?: any | null | number | '';
  rc_cin: string;
  status: string;
  created_at?: Date | null;
  updqted_at?: Date | null;
}

type PaymentMethod = {
  text: string;
  value: Number | null;
};

export const methods: PaymentMethod[] = [
  {
    text: 'Chèque',
    value: 1,
  },
  {
    text: 'Virement',
    value: 2,
  },
  {
    text: 'Carte',
    value: 3,
  },
  {
    text: 'Espèce',
    value: 4,
  },
];
