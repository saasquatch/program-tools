export declare type RequiredPropsErrorProps = {
  missingProps: {
    attribute: string;
    value: string | boolean | number;
  }[] | false;
};
export declare function RequiredPropsError({ missingProps }: RequiredPropsErrorProps): any;
