"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { type StoreApi } from "zustand";

import {
  UserLink,
  type UserStore,
  UserStoreContext,
  createUserStore,
  initUserStore,
} from "@/context/User/Context";
import { useAuth } from "@clerk/nextjs";
import { findUserLinks } from "@/services/firebase";

export interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const { getToken, userId } = useAuth();
  const storeRef = useRef<StoreApi<UserStore>>();
  if (!storeRef.current) {
    storeRef.current = createUserStore(initUserStore());
  }

  useEffect(() => {
    const getUserLinks = async () => {
      const docs = await findUserLinks(userId!);

      const links: UserLink[] = docs.map((doc) => {
        const docId = doc.id;
        const docData = doc.data();

        return {
          id: docId,
          platform: docData.platform,
          url: docData.url,
          fromLocal: false,
        };
      });

      storeRef.current?.setState({
        links: links,
      });
    };

    if (userId) {
      getUserLinks();
    }
  }, [userId]);

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};
