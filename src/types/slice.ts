export interface slice {
  map(arg0: (slice: slice, i: number) => import('react').JSX.Element): import('react').ReactNode;
  id: string;
  amount: number;
  received_date: any;
  created_at?: Date | null;
  updated_at?: Date | null;
}
