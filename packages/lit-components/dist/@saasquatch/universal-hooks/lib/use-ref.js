import { useMemo } from "./use-memo";
export function useRef(initialValue) {
    return useMemo(() => ({
        current: initialValue,
    }), []);
}
