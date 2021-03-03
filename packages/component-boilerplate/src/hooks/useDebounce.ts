import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "@saasquatch/stencil-hooks";
import debounce from "debounce";

function valueEquality<T>(left: T, right: T): boolean {
  return left === right;
}

/**
 * Provides a debounced value
 *
 * Forked from React version here: https://github.com/xnimorz/use-debounce
 *
 * @param value
 * @param delay
 * @param options
 */
export function useDebounce<T>(
  value: T,
  delay: number,
  options?: {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
    equalityFn?: (left: T, right: T) => boolean;
  }
) {
  const eq = (options && options.equalityFn) || valueEquality;

  const [state, dispatch] = useState(value);
  const debounced = useDebouncedCallback(
    useCallback((value: T) => dispatch(value), []),
    delay,
    options
  );
  const previousValue = useRef(value);

  useEffect(() => {
    // We need to use this condition otherwise we will run debounce timer for the first render (including maxWait option)
    if (!eq(previousValue.current, value)) {
      debounced.callback(value);
      previousValue.current = value;
    }
  }, [value, debounced, eq]);

  return [
    state,
    {
      cancel: debounced.cancel,
      flush: debounced.flush,
    },
  ] as const;
}

export interface CallOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface ControlFunctions {
  cancel: () => void;
  flush: () => void;
}

/**
 * Subsequent calls to the debounced function `debounced.callback` return the result of the last func invocation.
 * Note, that if there are no previous invocations it's mean you will get undefined. You should check it in your code properly.
 */
export interface DebouncedState<T extends (...args: any[]) => ReturnType<T>>
  extends ControlFunctions {
  callback: (...args: Parameters<T>) => ReturnType<T>;
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked, or until the next browser frame is drawn. The debounced function
 * comes with a `cancel` method to cancel delayed `func` invocations and a
 * `flush` method to immediately invoke them. Provide `options` to indicate
 * whether `func` should be invoked on the leading and/or trailing edge of the
 * `wait` timeout. The `func` is invoked with the last arguments provided to the
 * debounced function. Subsequent calls to the debounced function return the
 * result of the last `func` invocation.

 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0]
 *  The number of milliseconds to delay
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 */
export default function useDebouncedCallback<
  T extends (...args: any[]) => ReturnType<T>
>(
  func: T,
  wait: number = 0,
  options: CallOptions = { leading: false }
): DebouncedState<T> {
  const callback = useMemo(() => debounce(func, wait, options.leading), [
    func,
    wait,
    options.leading,
  ]);

  const { flush, clear } = callback;

  return {
    flush,
    cancel: clear,
    callback,
  };
}
