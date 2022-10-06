import preset from "jss-preset-default";
import { create } from "jss";

export const jss = create(preset());

export const createStyleSheet: typeof jss["createStyleSheet"] = (...args) =>
  jss.createStyleSheet(...args);

/**
 * Use this preset instead of creating a new JSS instance everywhere
 *
 */
export default jss;
