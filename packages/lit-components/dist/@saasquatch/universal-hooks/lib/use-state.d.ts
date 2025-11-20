export type InitialState<T> = T | (() => T);
export type NewState<T> = T | ((previousState: T) => T);
export type StateUpdater<T> = (value: NewState<T>) => void;
export type StateTuple<T> = readonly [T, StateUpdater<T>];
export interface UseState {
    <T>(): StateTuple<T | undefined>;
    <T>(value?: InitialState<T>): StateTuple<T>;
}
/**
 * @function
 * @template {*} T
 * @param {T} [initialState] - Optional initial state
 * @return {StateTuple<T>} stateTuple - Tuple of current state and state updater function
 */
declare const useState: UseState;
export { useState };
