import { h, Host } from "@stencil/core";

export interface UserNameViewProps {
  loadingText: string;
  loading: boolean;
  username: string;
}

export function UserNameView(props: UserNameViewProps) {
  return <Host>{props.loading ? props.loadingText : props.username}</Host>;
}
