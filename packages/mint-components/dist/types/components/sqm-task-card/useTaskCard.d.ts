import { TaskCard } from "./sqm-task-card";
export declare function useTaskCard(props: TaskCard): {
  states: {
    loadingEvent: boolean;
    locale: string;
  };
  callbacks: {
    sendEvent: (eventKey: string) => void;
    onClick: () => void;
  };
};
