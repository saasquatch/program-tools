/**
 * Represents a row in the mutations assertion step
 */
export type MutationStepRow = {
  type: string;
  key: string;
  count: string;
  user: string;
};

/**
 * Represents a row in the analytics assertion step
 */
export type AnalyticsStepRow = {
  type: string;
  count: string;
  user: string;
};
