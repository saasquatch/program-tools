type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;
export type DemoData<T extends {}> = Partial<Omit<T, "text">>;
