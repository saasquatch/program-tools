import { useContext } from "@saasquatch/universal-hooks";

function createContext<T>(name: string) {
  return {
    useContext() {
      return useContext<T>(name);
    },
  };
}

/**
 * Environment provided by components hosted in a web component (`sqh-widget`)
 */
export type SquatchPortal = typeof SquatchPortalInstance;

export type PortalEnv = {
  tenantAlias: string;
  appDomain: string;
};

export type UserIdentifier = {
  id: string;
  accountId: string;
};

export type UserContext = {
  user: UserIdentifier;
  logout(): void;
};

export type NavigationContext = {
  page: string;
  goTo(page: string): void;
};

export const SquatchPortalInstance = {
  userContext: createContext<UserIdentifier>("sq-context:user"),
  localeContext: createContext<string>("sq-context:locale"),
  navigationContext: createContext<NavigationContext>("sq-context:navigation"),
} as const;
