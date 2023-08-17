import { StyleProps as BadgeStyleProps } from "./components/Badge/Badge";

export const dashToSnakeCase = (str: BadgeStyleProps["status"]) =>
  str.replace("-", "_");
