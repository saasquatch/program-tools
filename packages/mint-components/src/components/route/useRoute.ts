import { useCurrentPage } from "@saasquatch/component-boilerplate";
import { RouteProps } from "./sqm-route";
import debugFn from "debug";

const debug = debugFn("sq:useRoute");
export function useRoute(props: RouteProps) {
  const path = useCurrentPage();
  debug({ path: props.path, currentPath: path?.pathname });
  return { states: { path: props.path, currentPath: path?.pathname } };
}
