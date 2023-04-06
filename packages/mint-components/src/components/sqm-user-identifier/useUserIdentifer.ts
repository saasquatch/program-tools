import { UserIdentifier } from "./sqm-user-identifier";
import { UserIdentifierViewProps } from "./sqm-user-identifier-view";

export function useUserIdentifier(
  props: UserIdentifier
): UserIdentifierViewProps {
  return { switchUserLink: "", userIdentificationText: "", switchUserText: "" };
}
