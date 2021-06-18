import { JSONSchema6 } from "json-schema";

export interface Webhook {
  id: string;
  type: string;
  tenantAlias: string;
  live: boolean;
  created: number;
  [key: string]: any;
}

export interface FormRequestContext<IntegrationConfig, FormConfig> {
  type: "SUBMIT" | "VALIDATE" | "INTROSPECTION" | "INITIAL_DATA";
  tenantAlias: string;
  formData: Record<string, any>;
  formSubmissionRecordId: string;
  dateSubmitted: number;
  form: { key: string; integrationConfig?: FormConfig };
  integrationConfig?: IntegrationConfig;
  user?: {
    id: string;
    accountId: string;
    [key: string]: any;
  };
}

export interface FormSubmitRequestContext<IntegrationConfig, FormConfig>
  extends FormRequestContext<IntegrationConfig, FormConfig> {
  type: "SUBMIT";
}

export interface FormValidateRequestContext<IntegrationConfig, FormConfig>
  extends FormRequestContext<IntegrationConfig, FormConfig> {
  type: "VALIDATE";
}

export interface FormIntrospectionRequestContext<IntegrationConfig, FormConfig>
  extends FormRequestContext<IntegrationConfig, FormConfig> {
  type: "INTROSPECTION";
}

export interface FormInitialDataRequestContext<IntegrationConfig, FormConfig>
  extends FormRequestContext<IntegrationConfig, FormConfig> {
  type: "INITIAL_DATA";
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
}

export interface FormSubmissionResponse {
  results: FormSubmissionResult[];
}

export interface FormValidationResponse {
  valid: boolean;
  errors: {
    error: string;
    keywordLocation?: string;
    instanceLocation?: string;
  }[];
}

export interface FormIntrospectionResponse {
  actions: {
    name: string;
    description?: string;
  }[];
  inputData: {
    name: string;
    description?: string;
  }[];
  inputDataSchema: JSONSchema6;
}

export interface FormInitialDataResponse {
  inputData: Record<string, any>;
}

export interface FormErrorResponse {
  errorCode: string;
  error: string;
}

export type FormHandlerResponse =
  | FormSubmissionResponse
  | FormValidationResponse
  | FormInitialDataResponse
  | FormIntrospectionResponse
  | FormErrorResponse;

export type TenantScopedGraphQLFn = <QueryResponseShape>(
  query: string,
  variables?: Record<string, any>,
  operationName?: string
) => Promise<QueryResponseShape>;
