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
      const firebaseToken = await getToken({
        template: "integration_firebase",
      });

      const docs = await findUserLinks(firebaseToken!, userId!);

      const links: UserLink[] = docs.map((doc) => {
        const docId = doc.id;
        const docData = doc.data();

        return {
          id: docId,
          platform: docData.platform,
          url: docData.url,
        };
      });

      storeRef.current?.setState({
        links: links,
      });
    };

    getUserLinks();
  }, []);

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};
