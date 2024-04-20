"use client";

import { type ReactNode, useRef } from "react";
import { type StoreApi } from "zustand";

import {
  type UserStore,
  UserStoreContext,
  createUserStore,
  initUserStore,
} from "@/context/User/Context";

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UserStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserStore(initUserStore());
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};
