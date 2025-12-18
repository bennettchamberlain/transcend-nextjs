import type { ReactNode } from "react";

import { createContext, useContext, useMemo, useState } from "react";

import type { ArtistAccount, MulticamRequest } from "@site/types/multicam";

interface MulticamContextType {
  account: ArtistAccount | null;
  requests: MulticamRequest[];
  balance: number;
  setAccount: (account: ArtistAccount | null) => void;
  addRequest: (request: MulticamRequest) => void;
  updateBalance: (amount: number) => void;
}

const MulticamContext = createContext<MulticamContextType | undefined>(undefined);

export function MulticamProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<ArtistAccount | null>(null);
  const [requests, setRequests] = useState<MulticamRequest[]>([]);
  const [balance, setBalance] = useState(0);

  const addRequest = (request: MulticamRequest) => {
    setRequests((prev) => [...prev, request]);
  };

  const updateBalance = (amount: number) => {
    setBalance(amount);
  };

  const value = useMemo(
    () => ({
      account,
      requests,
      balance,
      setAccount,
      addRequest,
      updateBalance,
    }),
    [account, requests, balance],
  );

  return <MulticamContext.Provider value={value}>{children}</MulticamContext.Provider>;
}

export function useMulticam() {
  const context = useContext(MulticamContext);
  if (context === undefined) {
    throw new Error("useMulticam must be used within a MulticamProvider");
  }
  return context;
}
