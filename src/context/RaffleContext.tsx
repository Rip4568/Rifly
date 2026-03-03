"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Raffle, RaffleAction, UserState } from "@/types";

const initialState: UserState = {
  balance: 100.0, // Mock initial balance
  raffles: [],
};

const raffleReducer = (state: UserState, action: RaffleAction): UserState => {
  switch (action.type) {
    case "CREATE_RAFFLE":
      // Deduct mock fee of 2.00
      if (state.balance < 2) return state; // Should be handled in UI too
      return {
        ...state,
        balance: state.balance - 2.0,
        raffles: [action.payload, ...state.raffles],
      };
    case "DELETE_RAFFLE":
      return {
        ...state,
        raffles: state.raffles.filter((r) => r.id !== action.payload),
      };
    case "EDIT_RAFFLE":
      return {
        ...state,
        raffles: state.raffles.map((r) =>
          r.id === action.payload.id ? action.payload : r,
        ),
      };
    case "BUY_TICKET":
      return {
        ...state,
        raffles: state.raffles.map((r) => {
          if (r.id === action.payload.raffleId) {
            const newCotas = action.payload.ticketNumbers.filter(
              (t) => !r.soldTickets.includes(t),
            );
            if (newCotas.length === 0) return r;
            return { ...r, soldTickets: [...r.soldTickets, ...newCotas] };
          }
          return r;
        }),
      };
    case "CLOSE_RAFFLE":
      return {
        ...state,
        raffles: state.raffles.map((r) =>
          r.id === action.payload.raffleId
            ? {
                ...r,
                winner: action.payload.winner,
                closedAt: new Date().toISOString(),
              }
            : r,
        ),
      };
    default:
      return state;
  }
};

interface RaffleContextType {
  state: UserState;
  createRaffle: (
    raffle: Omit<Raffle, "id" | "createdAt" | "soldTickets">,
  ) => void;
  deleteRaffle: (id: string) => void;
  editRaffle: (raffle: Raffle) => void;
  buyTicket: (raffleId: string, ticketNumbers: number[]) => void;
  closeRaffle: (raffleId: string, winner: number) => void;
}

const RaffleContext = createContext<RaffleContextType | undefined>(undefined);

export const RaffleProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    raffleReducer,
    initialState,
    (initial) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("raffle_state");
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch (e) {
            console.error("Failed to parse local storage", e);
          }
        }
      }
      return initial;
    },
  );

  useEffect(() => {
    localStorage.setItem("raffle_state", JSON.stringify(state));
  }, [state]);

  const createRaffle = (
    data: Omit<Raffle, "id" | "createdAt" | "soldTickets">,
  ) => {
    const newRaffle: Raffle = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      soldTickets: [],
    };
    dispatch({ type: "CREATE_RAFFLE", payload: newRaffle });
  };

  const deleteRaffle = (id: string) => {
    dispatch({ type: "DELETE_RAFFLE", payload: id });
  };

  const editRaffle = (raffle: Raffle) => {
    dispatch({ type: "EDIT_RAFFLE", payload: raffle });
  };

  const buyTicket = (raffleId: string, ticketNumbers: number[]) => {
    dispatch({ type: "BUY_TICKET", payload: { raffleId, ticketNumbers } });
  };

  const closeRaffle = (raffleId: string, winner: number) => {
    dispatch({ type: "CLOSE_RAFFLE", payload: { raffleId, winner } });
  };

  return (
    <RaffleContext.Provider
      value={{
        state,
        createRaffle,
        deleteRaffle,
        editRaffle,
        buyTicket,
        closeRaffle,
      }}
    >
      {children}
    </RaffleContext.Provider>
  );
};

export const useRaffle = () => {
  const context = useContext(RaffleContext);
  if (context === undefined) {
    throw new Error("useRaffle must be used within a RaffleProvider");
  }
  return context;
};
