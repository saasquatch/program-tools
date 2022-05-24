import { VNode } from "../../../stencil-public-runtime";
export declare type ProgressBarProps = {
  progress?: number;
  goal?: number;
  progressBarUnit?: string;
  steps?: boolean;
  repeatable?: boolean;
  complete?: boolean;
  expired?: boolean;
  finite?: number;
};
export declare function ProgressBarView(props: ProgressBarProps): VNode;
