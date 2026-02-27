export type Theme = 'default' | 'football' | 'baby' | 'money';

export interface Raffle {
  id: string;
  title: string;
  description: string;
  ticketPrice: number;
  theme: Theme;
  totalTickets: number;
  soldTickets: number[];
  createdAt: string;
}

export interface UserState {
  balance: number;
  raffles: Raffle[];
}

export type RaffleAction =
  | { type: 'CREATE_RAFFLE'; payload: Raffle }
  | { type: 'DELETE_RAFFLE'; payload: string }
  | { type: 'EDIT_RAFFLE'; payload: Raffle }
  | { type: 'BUY_TICKET'; payload: { raffleId: string; ticketNumber: number } };
