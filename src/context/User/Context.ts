import { createContext } from "react";
import { createStore, StoreApi } from "zustand";

export type UserLink = {
  id: string;
  platform: string;
  url: string;
};
export type UserState = {
  email?: string;
  links: UserLink[] | undefined;
  canSave: boolean;
};

export type UserAction = {
  addLinks: (newLink: UserLink) => void;
  setUrl: (index: number, url: string) => void;
  setPlatform: (index: number, platform: string) => void;
};

export type UserStore = UserState & UserAction;

export const initUserStore = (): UserState => {
  return {
    links: undefined,
    email: "",
    canSave: false,
  };
};

export const defaultInitState: UserState = {
  links: undefined,
  email: "",
  canSave: false,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    addLinks: (newLink: UserLink) =>
      set((state) => {
        return {
          links: [...state.links!, newLink],
          canSave: true,
        };
      }),
    setUrl: (index, url) =>
      set((state) => {
        const tempLinks = [...state.links!];
        tempLinks[index].url = url;

        return {
          links: tempLinks,
          canSave: true,
        };
      }),
    setPlatform: (index, platform) =>
      set((state) => {
        const tempLinks = [...state.links!];
        tempLinks[index].platform = platform;

        return {
          links: tempLinks,
          canSave: true,
        };
      }),
  }));
};

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null);
