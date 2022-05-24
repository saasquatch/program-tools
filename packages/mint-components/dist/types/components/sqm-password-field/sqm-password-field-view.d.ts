import { VNode } from "../../stencil-public-runtime";
export interface PortalPasswordFieldViewProps {
  states: {
    enableValidation: boolean;
    dynamicValidation: VNode | string;
    validationErrors: Record<string, string>;
    content: {
      fieldLabel: string;
    };
  };
  callbacks: {
    onInput: (input: InputEvent) => void;
  };
}
export declare function PortalResetPasswordView(props: PortalPasswordFieldViewProps): any;
