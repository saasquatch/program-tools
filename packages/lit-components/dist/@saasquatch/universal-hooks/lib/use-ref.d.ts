export interface Ref<T> {
    current: T;
}
/**
 * @function
 * @template T
 * @param   {T} initialValue
 * @return  {{ current: T }} Ref
 */
export declare function useRef<T>(): Ref<T | undefined>;
export declare function useRef<T>(initialValue: T): Ref<T>;
