/**
 * Note: reverse-engineered from a returned error. May not capture all error types.
 */

export type GraphQlRequestError<T> = {
  response: {
    errors: [
      {
        message: string;
        locations: [{ line: number; column: number }];
        path: string[];
        extensions: {
          apiError: {
            message: string;
            statusCode: number;
            apiErrorCode: string;
            rsCode: string;
          };
          classification: string;
        };
      }
    ];
    data: Partial<T>;
    status: number;
  };
  request: {
    query: string;
    variables: { [key: string]: unknown };
  };
};
