import { VNode } from "../../stencil-public-runtime";
export declare type TaskCardViewProps = {
  content: {
    rewardAmount: string;
    cardTitle: string;
    description: string;
    showProgressBar: boolean;
    repeatable: boolean;
    steps: boolean;
    finite: number;
    goal: number;
    completedText: string;
    showExpiry: boolean;
    expiryMessage: string;
    rewardDuration: string;
    displayDuration?: string;
    startsOnMessage: string;
    endedMessage: string;
    rewardUnit: string;
    buttonText: string;
    buttonLink: string;
    openNewTab: boolean;
    eventKey?: string;
  };
  states: {
    loading: boolean;
    loadingEvent: boolean;
    progress: number;
    locale?: string;
  };
  callbacks?: {
    sendEvent: (event: string) => void;
    onClick: () => void;
  };
};
export declare function TaskCardView(props: TaskCardViewProps): VNode;
