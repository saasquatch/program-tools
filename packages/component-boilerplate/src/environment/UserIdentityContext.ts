import { useDomContext } from "@saasquatch/dom-context-hooks";
import { ContextProvider } from "dom-context";
import { getEnvironmentSDK, useHost } from "..";

const CONTEXT_NAME = "sq:user-identity";

export type UserIdentity = {
  id: string;
  accountId: string;
  jwt?: string;
  sessionData?: { [key: string]: any };
};

declare global {
  interface Window {
    squatchUserIdentity: ContextProvider<UserIdentity>;
  }
}

function _lazilyStartGlobally() {
  const globalProvider = window.squatchUserIdentity;
  if (!globalProvider) {
    // Lazily creates a global provider
    window.squatchUserIdentity = new ContextProvider<UserIdentity>({
      element: document.documentElement,
      initialState: _getInitialValue(),
      contextName: CONTEXT_NAME,
    }).start();
  }
}

let _db: null | IDBDatabase = null;
async function ensureIndexedDB(): Promise<IDBDatabase> {
  if (_db) return _db;

  _db = await new Promise((resolve) => {
    var DBOpenRequest = window.indexedDB.open(CONTEXT_NAME, 4);

    DBOpenRequest.onerror = function (_ev) {
      console.error("Connection to indexedDB failed.");
      _db = null;
      resolve(null);
    };

    DBOpenRequest.onsuccess = function (_ev) {
      const db = DBOpenRequest.result;
      db.onclose = function (_ev) {
        _db = null;
      };
      resolve(db);
    };

    DBOpenRequest.onupgradeneeded = function (event: any) {
      const db: IDBDatabase = event.target.result;

      db.onclose = function (_ev) {
        _db = null;
      };
      const objectStore = db.createObjectStore(CONTEXT_NAME);

      objectStore.createIndex("id", "id", { unique: false });
      objectStore.createIndex("accountId", "accountId", { unique: false });
      objectStore.createIndex("jwt", "jwt", { unique: false });
      objectStore.createIndex("sessionData", "sessionData", { unique: false });

      resolve(db);
    };
  });
  return _db;
}

function _getInitialValue(): UserIdentity | undefined {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchAndroid":
    case "SquatchJS2":
      return {
        id: sdk.widgetIdent.userId,
        accountId: sdk.widgetIdent.accountId,
        jwt: sdk.widgetIdent.token,
      };
    case "SquatchPortal":
      // TODO: Could this come from localstorage? Or a cookie?
      return undefined;
    case "SquatchAdmin":
    case "None":
      // Not logged in for admin portal / none default case
      return undefined;
  }
}

/**
 * Overide the globally defined user context
 *
 * @param identity the new identity of the user, or undefined if logged out
 */
export function setUserIdentity(identity?: UserIdentity) {
  _lazilyStartGlobally();
  const globalProvider = window.squatchUserIdentity;
  globalProvider.context = identity;
}

/**
 * Overide the globally defined user context and persist in indexedDB
 *
 * @param identity the new identity of the user, or undefined if logged out
 */
export async function setPersistedUserIdentity(identity?: UserIdentity) {
  // store in indexedDB
  const db = await ensureIndexedDB();
  await new Promise<void>((resolve) => {
    const tx = db.transaction(CONTEXT_NAME, "readwrite");
    tx.oncomplete = (_ev) => {
      resolve();
    };
    const store = tx.objectStore(CONTEXT_NAME);
    store.put({ ...identity }, "user");
  });
  return setUserIdentity(identity);
}

/**
 * Gets the SessionData of the current user, or undefined if logged out
 */
export function useSessionData(): { [key: string]: any } | undefined {
  return useUserIdentity()?.sessionData;
}

/**
 * Gets the JWT of the current user, or undefined if logged out
 */
export function useToken(): string | undefined {
  return useUserIdentity()?.jwt;
}

/**
 * Get the IDs and JWT of the current user, or undefined if logged out
 */
export function useUserIdentity(): UserIdentity | undefined {
  _lazilyStartGlobally();
  const host = useHost();
  return useDomContext(host, CONTEXT_NAME);
}

/**
 * Get the IDs and JWT of the current user, persisted in indexedDB, or undefined if logged out
 */
export async function usePersistedUserIdentity(): Promise<
  UserIdentity | undefined
> {
  let userIdent = useUserIdentity();
  if (!userIdent) {
    const db = await ensureIndexedDB();
    userIdent = await new Promise((resolve) => {
      const tx = db.transaction(CONTEXT_NAME, "readonly");
      tx.onerror = (_ev) => {
        resolve(undefined);
      };
      const store = tx.objectStore(CONTEXT_NAME);
      const request = store.get("user");
      request.onerror = (_ev) => {
        resolve(undefined);
      };
      request.onsuccess = (_ev) => {
        resolve(request.result || undefined);
      };
    });
  }
  return userIdent;
}
