const ref = { current: undefined };

export function useHost(): HTMLElement {
  if (ref.current === undefined) {
    throw new Error("no implementation of useHost provided");
  }

  return ref.current();
}

export function setImplementation(implementation: () => HTMLElement) {
  if (!implementation) {
    throw new Error("Must supply an implementation");
  }

  if (typeof implementation !== "function") {
    throw new Error("implementation must be a function");
  }

  ref.current = implementation;
}