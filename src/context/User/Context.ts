import { createContext } from "react";
import { createStore, StoreApi } from "zustand";

export type UserLink = {
  platform: string;
  url: string;
};
export type UserState =
  | {
      email: string;
      token: string;
      isLogin: true;
      links: UserLink[];
    }
  | {
      isLogin: false;
    };

export type UserAction = {
  login: (email: string, token: string, links: UserLink[]) => void;
  logout: () => void;
};

export type UserStore = UserState & UserAction;

export const initUserStore = (): UserState => {
  return { isLogin: false };
};

export const defaultInitState: UserState = {
  isLogin: false,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    login: (email, token, links) =>
      set((state) => ({ isLogin: true, email, token, links })),
    logout: () => set((state) => ({ isLogin: false })),
  }));
};

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);
