import { Item } from 'src/types/items';

const now = new Date();

export const items: Item[] = [
  {
    id: '1',
    description: 'Item A',
    price: 19.99,
    quantity: 2,
    amount: 0, // This will be calculated later
  },
  {
    id: '2',
    description: 'Item B',
    price: 29.99,
    quantity: 3,
    amount: 0,
  },
  {
    id: '3',
    description: 'Item C',
    price: 9.99,
    quantity: 5,
    amount: 0,
  },
  {
    id: '4',
    description: 'Item D',
    price: 39.99,
    quantity: 1,
    amount: 0,
  },
  {
    id: '5',
    description: 'Item E',
    price: 14.99,
    quantity: 4,
    amount: 0,
  },
  {
    id: '6',
    description: 'Item F',
    price: 24.99,
    quantity: 2,
    amount: 0,
  },
  {
    id: '7',
    description: 'Item G',
    price: 49.99,
    quantity: 1,
    amount: 0,
  },
];
