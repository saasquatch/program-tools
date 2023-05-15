import { StyleProps as BadgeStyleProps } from "./components/Badge";

export const dashToSnakeCase = (str: BadgeStyleProps["status"]) =>
  str.replace("-", "_");
