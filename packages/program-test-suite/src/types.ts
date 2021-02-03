export type MutationStepRow = {
  type: string;
  key: string;
  count: string;
  user: string;
  assignedCredit?: number;
};

export type AnalyticsStepRow = {
  type: string;
  count: string;
  user: string;
};

export type ValidationStepRow = {
  key: string;
  message: string;
  status: string;
};
