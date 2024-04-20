import { useContext } from "react";
import { UserStore, UserStoreContext } from "./Context";
import { useStore } from "zustand";

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be use within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
