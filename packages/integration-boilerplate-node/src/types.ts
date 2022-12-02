import { JSONSchema6 } from "json-schema";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import * as draft6MetaSchema from "ajv/dist/refs/json-schema-draft-06.json";
import * as integrationTemplateSchema_import from "@saasquatch/schema/json/IntegrationConfig.schema.json";

const integrationTemplateSchema = { ...integrationTemplateSchema_import };

export type TenantAlias = string;
export interface Webhook {
  id: string;
  type: string;
  tenantAlias: TenantAlias;
  live: boolean;
  created: number;
  [key: string]: any;
}

const additionalPropertiesTrue = (input: any) => {
  Object.entries(input).forEach(([key, val]) => {
    if (key === "additionalProperties") {
      input[key] = true;
    } else if (typeof val === "object") {
      additionalPropertiesTrue(val);
    }
  });
};

export type IntegrationConfiguration =
  saasquatch.IntegrationConfig.IntegrationConfiguration;

// @ts-ignore
integrationTemplateSchema["$id"] = "#/definitions/integrationTemplateSchema";

// allow additionalProperties: true throughout the entire schema. this enables
// "at least equivalent" ajv validation for the input
additionalPropertiesTrue(integrationTemplateSchema);

const introspectionBodySchema = {
  $schema: "http://json-schema.org/draft-06/schema#",
  type: "object",
  required: ["tenantAlias", "templateIntegrationConfig"],
  additionalProperties: true,
  properties: {
    tenantAlias: { type: "string" },
    templateIntegrationConfig: {
      $ref: "#/definitions/integrationTemplateSchema",
    },
  },
};

export type IntrospectionBody<IntegrationConfig> = {
  /**
   * The tenantAlias
   */
  tenantAlias: TenantAlias;
  /**
   * The integration settings for the specific tenant that this introspection is for
   */
  config: IntegrationConfig;
  /**
   * The integration's top-level config
   */
  templateIntegrationConfig: IntegrationConfiguration;
};

const ajv = new Ajv();
addFormats(ajv);
ajv.addMetaSchema(draft6MetaSchema);
ajv.addSchema(integrationTemplateSchema);
ajv.addSchema(introspectionBodySchema);

export const validateIntrospectionBody = ajv.compile(introspectionBodySchema);

export interface FormRequestContext<IntegrationConfig, FormConfig> {
  type: "SUBMIT" | "VALIDATE" | "INTROSPECTION" | "INITIAL_DATA";
  tenantAlias: TenantAlias;
  formData: Record<string, any>;
  formSubmissionRecordId: string;
  dateSubmitted: number;
  form: {
    key: string;
    integrationConfig?: FormConfig;
    globalConfig?: Record<string, any>;
  };
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
  data?: Record<string, any>;
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
