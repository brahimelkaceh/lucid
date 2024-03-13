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
export const membersData = {
  members: [
    {
      id: '1cEw3aHAuqDSAPfraPYx',
      status: 'paid',
      payment_method: 4,
      rc_cin: 'REC44FGB',
      updated_at: new Date(1707930081 * 1000 + 598),
      created_at: new Date(1707930037 * 1000 + 704),
      email: 'jozakaw@mailinator.com',
      payment_date: new Date(1706979637 * 1000),
      amount: 500,
      full_name: 'Tamekah Davis',
    },
    {
      id: '7A4MEoaJHGmZyKkgjGD9',
      payment_method: null,
      status: 'unpaid',
      amount: 0,
      rc_cin: 'Soluta temporibus qu',
      full_name: 'aretha watts',
      email: 'sizup@mailinator.com',
      payment_date: new Date(0),
      created_at: new Date(1707994361 * 1000 + 205),
    },
    {
      id: 'D7oY5E9voUFkW6fG5OdU',
      updated_at: new Date(1707995627 * 1000 + 786),
      full_name: 'beverly rojas',
      payment_date: new Date(0),
      created_at: new Date(1707924805 * 1000 + 589),
      status: 'unpaid',
      rc_cin: 'Maiores ipsum volup',
      payment_method: null,
      amount: 0,
      email: 'mixij@mailinator.com',
    },
    {
      id: 'ubs58fJqbckVwko5PDSK',
      full_name: 'bruce alvarez',
      payment_date: new Date(1707584580 * 1000),
      payment_method: 3, // Adjusted typing
      created_at: new Date(1707927406 * 1000 + 844),
      amount: 1500, // Adjusted typing
      rc_cin: 'Sit veritatis non di',
      status: 'paid',
      email: 'nejesu@mailinator.com',
      updated_at: new Date(1707930180 * 1000 + 414),
    },
    {
      id: '9g4H6bC56Hy1AvQZZf7y',
      status: 'paid',
      created_at: new Date(1707995502 * 1000 + 775),
      email: 'higiki@mailinator.com',
      payment_method: 4, // Adjusted typing
      payment_date: new Date(1707477131 * 1000),
      full_name: 'kristen mckee',
      rc_cin: 'Odio accusantium qua',
      amount: 1500, // Adjusted typing
      updated_at: new Date(1707995531 * 1000 + 578),
    },
  ],
  count: 5,
};
