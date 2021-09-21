import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { connectToParent, Connection } from "penpal";
import ResizeObserver from "resize-observer-polyfill";

export enum ConfigMode {
  Unknown,
  IntegrationsPage,
  FormConfigSubmitActions,
  FormConfigInitialDataActions,
}

interface PenpalParentMethods<IntegrationConfig, FormConfig> {
  resize(height: number): Promise<void>;
  saveIntegration(
    config: Partial<IntegrationConfig>
  ): Promise<{ upsertIntegration: { config: IntegrationConfig } }>;
  patchIntegrationConfig(
    patch: IntegrationConfigPatch
  ): Promise<{ patchIntegrationConfig: { config: IntegrationConfig } }>;
  updateFormConfiguration(config: Partial<FormConfig>): Promise<void>;
  navigateToNewPortalURL(url: string): Promise<void>;
  getFileStackConfig(): Promise<FileStackConfig>;
}

interface FileStackConfig {
  tenantAlias: string;
  fileStackAPIKey: string;
  fileStackPolicy: string;
  fileStackSignature: string;
}

interface DisplayConfiguration<IntegrationConfig, FormConfig> {
  tenantScopedToken: string;
  tenantAlias: string;
  integrationConfig: IntegrationConfig;
  formConfig?: FormConfig;
  formType?: "submit_actions" | "initial_data_actions";
}

type IntegrationConfigPatch = Array<{ op: string; path: string; value: any }>;

type PenpalConnection<IntegrationConfig, FormConfig> = Connection<
  PenpalParentMethods<IntegrationConfig, FormConfig>
>;

interface PenpalContextMethods<IntegrationConfig, FormConfig> {
  saveIntegrationConfig(config: Partial<IntegrationConfig>): Promise<void>;
  patchIntegrationConfig(patch: IntegrationConfigPatch): Promise<void>;
  saveFormConfig(config: Partial<FormConfig>): Promise<void>;
  getFileStackConfig(): Promise<FileStackConfig>;
  navigatePortal(url: string): Promise<void>;
  closeFormConfig(): Promise<void>;
  setShouldCancelDisableCallback: (fn: () => Promise<boolean>) => void;
}

interface PenpalContextInitialState {
  connected: false;
}

interface PenpalContextConnectedState<IntegrationConfig, FormConfig> {
  connected: true;
  mode: ConfigMode;
  tenantScopedToken: string;
  tenantAlias: string;
  integrationConfig: Partial<IntegrationConfig>;
  formConfig: Partial<FormConfig>;
}

type PenpalContextState<IntegrationConfig, FormConfig> =
  | PenpalContextInitialState
  | PenpalContextConnectedState<
      Partial<IntegrationConfig>,
      Partial<FormConfig>
    >;

export type PenpalContextValue<IntegrationConfig, FormConfig> =
  | PenpalContextInitialState
  | (PenpalContextConnectedState<
      Partial<IntegrationConfig>,
      Partial<FormConfig>
    > &
      PenpalContextMethods<Partial<IntegrationConfig>, Partial<FormConfig>>);

export const PenpalContext = React.createContext<PenpalContextValue<any, any>>({
  connected: false,
});

interface PenpalContextProviderProps {
  fallback?: React.ReactElement;
  loading?: React.ReactElement;
}

export function PenpalContextProvider<
  IntegrationConfig extends {} = {},
  FormConfig extends {} = {}
>(props: PenpalContextProviderProps & { children: any }) {
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const penpalConnectionRef = useRef<PenpalConnection<
    IntegrationConfig,
    FormConfig
  > | null>(null);
  const [state, setState] = useState<
    PenpalContextState<IntegrationConfig, FormConfig>
  >({
    //@ts-ignore - allows storybook load the component
    connected: process.env.NODE_ENV === "test" ? true : false,
  });
  const [triedToConnect, setTriedToConnect] = useState(false);
  const shouldCancelDisableCallbackRef = useRef(() => {
    return Promise.resolve(false);
  });

  const setShouldCancelDisableCallback = useCallback(
    (fn: () => Promise<boolean>) => {
      shouldCancelDisableCallbackRef.current = fn;
    },
    []
  );

  const assertConnected = useCallback(() => {
    if (!state.connected || !penpalConnectionRef.current) {
      throw new Error("No Penpal connection");
    }
  }, [state.connected]);

  const resize = useCallback(async (height: number) => {
    if (!penpalConnectionRef.current) {
      throw new Error("No penpal connection");
    }
    const parent = await penpalConnectionRef.current.promise;
    await parent.resize(height);
  }, []);

  const saveIntegrationConfig = useCallback(
    async (config: Partial<IntegrationConfig>) => {
      assertConnected();
      const parent = await penpalConnectionRef.current!.promise;
      const data = await parent.saveIntegration(config);
      setState((state) => ({
        ...state,
        integrationConfig: data.upsertIntegration.config,
      }));
    },
    [assertConnected]
  );

  const patchIntegrationConfig = useCallback(
    async (patch: IntegrationConfigPatch) => {
      assertConnected();
      const parent = await penpalConnectionRef.current!.promise;
      const data = await parent.patchIntegrationConfig(patch);
      setState((state) => ({
        ...state,
        integrationConfig: data.patchIntegrationConfig.config,
      }));
    },
    [assertConnected]
  );

  const saveFormConfig = useCallback(
    async (config: Partial<FormConfig>) => {
      assertConnected();
      const parent = await penpalConnectionRef.current!.promise;
      await parent.updateFormConfiguration(config);
      setState((state) => ({ ...state, formConfig: config }));
    },
    [assertConnected]
  );

  const getFileStackConfig = useCallback(async () => {
    assertConnected();
    const parent = await penpalConnectionRef.current!.promise;
    return parent.getFileStackConfig();
  }, [assertConnected]);

  const navigatePortal = useCallback(
    async (url: string) => {
      assertConnected();
      const parent = await penpalConnectionRef.current!.promise;
      await parent.navigateToNewPortalURL(url);
    },
    [assertConnected]
  );

  const closeFormConfig = useCallback(async () => {
    assertConnected();
    saveFormConfig(
      (state as PenpalContextConnectedState<IntegrationConfig, FormConfig>)
        .formConfig
    );
  }, [assertConnected, saveFormConfig, state]);

  useEffect(() => {
    (async () => {
      penpalConnectionRef.current = connectToParent({
        timeout: 5000,
        methods: {
          displayConfiguration({
            tenantScopedToken,
            tenantAlias,
            integrationConfig,
            formConfig,
            formType,
          }: DisplayConfiguration<IntegrationConfig, FormConfig>) {
            let mode = ConfigMode.Unknown;

            if (formType) {
              switch (formType) {
                case "submit_actions":
                  mode = ConfigMode.FormConfigSubmitActions;
                  break;
                case "initial_data_actions":
                  mode = ConfigMode.FormConfigInitialDataActions;
                  break;
                default:
                  throw new Error(
                    `Unknown form configuration mode: ${formType}`
                  );
              }
            } else {
              mode = ConfigMode.IntegrationsPage;
            }

            setState({
              connected: true,
              mode,
              tenantScopedToken,
              tenantAlias,
              integrationConfig,
              formConfig: formConfig || {},
            });
          },

          async shouldCancelDisable() {
            if (shouldCancelDisableCallbackRef.current) {
              return await shouldCancelDisableCallbackRef.current();
            }

            return false;
          },
        },
      });

      try {
        await penpalConnectionRef.current.promise;
      } catch (e) {
        setTriedToConnect(true);
        return;
      }

      resizeObserverRef.current = new ResizeObserver((entries: Array<any>) => {
        for (const entry of entries) {
          const { height } = entry.contentRect;
          resize(height);
        }
      });

      resizeObserverRef.current.observe(document.body);
    })();

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, [resize]);

  const value: PenpalContextValue<IntegrationConfig, FormConfig> = useMemo(
    () => ({
      ...state,
      resize,
      saveIntegrationConfig,
      patchIntegrationConfig,
      saveFormConfig,
      getFileStackConfig,
      navigatePortal,
      closeFormConfig,
      setShouldCancelDisableCallback,
    }),
    [
      state,
      resize,
      saveIntegrationConfig,
      patchIntegrationConfig,
      saveFormConfig,
      getFileStackConfig,
      navigatePortal,
      closeFormConfig,
      setShouldCancelDisableCallback,
    ]
  );

  return state.connected ? (
    <PenpalContext.Provider value={value}>
      {props.children}
    </PenpalContext.Provider>
  ) : triedToConnect && props.fallback ? (
    props.fallback
  ) : (
    props.loading || null
  );
}

function usePenpal<IntegrationConfig = {}, FormConfig = {}>() {
  const penpal: PenpalContextValue<IntegrationConfig, FormConfig> =
    useContext(PenpalContext);
  if (!penpal.connected) {
    throw new Error(
      "Not wrapped in PenpalContextProvider or no Penpal connection"
    );
  }
  return penpal;
}

export default usePenpal;
