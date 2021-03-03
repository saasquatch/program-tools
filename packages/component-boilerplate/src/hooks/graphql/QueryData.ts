import { GraphQlRequestError } from "./GraphQlRequestError";

export interface BaseQueryData<T = unknown> {
  loading: boolean;
  data?: T;
  errors?: GraphQlRequestError<T>;
}

export type QueryData<T> = BaseQueryData<T> & {
  refetch: () => unknown;
};
