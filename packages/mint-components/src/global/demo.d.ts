export type DemoData<T extends {}> = Partial<Omit<T, "callbacks" | "text">>;
export type StoryDemoData<T extends {}> = Partial<Omit<T, "text">>;
