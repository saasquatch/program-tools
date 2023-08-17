import { StyleProps as BadgeStyleProps } from "./components/Badge/Badge";

export const dashToSnakeCase = (str: BadgeStyleProps["status"]) =>
  str.replace("-", "_");

export const wcBoolean = (bool: boolean | undefined) => {
  return bool ? true : null;
};
