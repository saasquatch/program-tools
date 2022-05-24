export declare const RENDER_EVENT = "sqm:request-rerender";
/**
 * Requests a re-render for the wrapping table
 *
 * Useful when an attribute or other internal state changes
 *
 * @param deps an array of dependencies used for useEffect
 */
export declare function useRequestRerender(deps: unknown[]): void;
/**
 * Re-renders a parent component when child components make the request
 */
export declare function useRerenderListener(): number;
