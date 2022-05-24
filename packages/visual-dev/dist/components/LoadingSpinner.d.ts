/// <reference types="react" />
export interface RingProps {
    /**
     * Bottom offset
     */
    bottom?: string;
    /**
     * Right offset
     */
    right?: string;
    /**
     * Left offset
     */
    left?: string;
    /**
     * Right padding
     */
    paddingRight?: string;
    /**
     * Spinner colour
     */
    color?: string;
}
export declare const LoadingSpinner: ({ ...props }: RingProps) => JSX.Element;
export declare const LoadingSpinnerLarge: ({ ...props }: RingProps) => JSX.Element;
export declare const TableSpinner: () => JSX.Element;
export declare const TableInitialLoad: () => JSX.Element;
