import { createContext } from "react";
import { createStore, StoreApi } from "zustand";

export type UserLink = {
  id: string;
  platform: string;
  url: string;
};
export type UserState = {
  email?: string;
  token?: string;
  isLogin: boolean;
  links: UserLink[];
};

export type UserAction = {
  login: (email: string, token: string, links: UserLink[]) => void;
  logout: () => void;
  addLinks: (newLink: UserLink) => void;
  setUrl: (index: number, url: string) => void;
  setPlatform: (index: number, platform: string) => void;
};

export type UserStore = UserState & UserAction;

export const initUserStore = (): UserState => {
  return {
    isLogin: true,
    links: [],
    email: "aristoersapta@gmail.com",
    token: "12345678",
  };
};

export const defaultInitState: UserState = {
  isLogin: true,
  links: [],
  email: "aristoersapta@gmail.com",
  token: "12345678",
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    login: (email, token, links) =>
      set((state) => ({ isLogin: true, email, token, links })),
    logout: () => set((state) => ({ isLogin: false })),
    addLinks: (newLink: UserLink) =>
      set((state) => {
        return {
          links: [...state.links, newLink],
        };
      }),
    setUrl: (index, url) =>
      set((state) => {
        const tempLinks = [...state.links];
        tempLinks[index].url = url;

        return {
          links: tempLinks,
        };
      }),
    setPlatform: (index, platform) =>
      set((state) => {
        const tempLinks = [...state.links];
        tempLinks[index].platform = platform;

        return {
          links: tempLinks,
        };
      }),
  }));
};

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);
