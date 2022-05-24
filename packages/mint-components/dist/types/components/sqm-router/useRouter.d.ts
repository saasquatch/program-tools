export declare type Route = {
  path: string;
};
export declare function useRouter(): {
  callbacks: {
    setSlot: (value: HTMLElement | ((prev: HTMLElement) => HTMLElement)) => void;
    setContainer: (value: HTMLDivElement | ((prev: HTMLDivElement) => HTMLDivElement)) => void;
  };
};
