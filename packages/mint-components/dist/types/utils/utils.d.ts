export declare function format(first: string, middle: string, last: string): string;
export declare function getProps<T>(obj: T): T;
export declare function middleClickLink(e: MouseEvent, path: string): void;
declare type RequiredProps = {
  attribute: string;
  value: string | boolean | number;
}[];
export declare function getMissingProps(props: RequiredProps): false | {
  attribute: string;
  value: string | number | boolean;
}[];
export declare function luxonLocale(locale: string): string;
export {};
