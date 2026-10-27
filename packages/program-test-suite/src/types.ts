export type MutationStepRow = {
  type: string;
  key: string;
  count: string;
  user: string;
  assignedCredit?: string;
};

export type AnalyticsStepRow = {
  type: string;
  count: string;
  user: string;
  analyticsKey?: string;
  isConversion?: string;
};

export type ValidationStepRow = {
  key: string;
  message: string;
  status: string;
};

export type IntrospectionRow = {
  key: string;
  type: string;
};

export type IntrospectionError = {
  key: string;
  jsonPointer: string;
  description: string;
};

export type IntrospectionErrorRow = Pick<
  IntrospectionError,
  "key" | "jsonPointer"
>;

export type FieldValueRow = {
  field: string;
  value: string;
};

export type TenantFlavor = "saasquatch" | "impact";
