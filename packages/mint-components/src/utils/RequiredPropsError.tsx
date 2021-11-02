import { useHost } from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
export type RequiredPropsErrorProps = {
  missingProps:
    | {
        attribute: string;
        value: string | boolean | number;
      }[]
    | false;
};

const style = {
  iconStyle: {
    "&::part(icon)": { marginTop: "-110px" },
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function RequiredPropsError({ missingProps }: RequiredPropsErrorProps) {
  if (!missingProps) return false;
  const host = useHost();
  return (
    <sl-alert type="danger" open class={sheet.classes.iconStyle}>
      <style type="text/css">{styleString}</style>
      <sl-icon slot="icon" name="exclamation-octagon"></sl-icon>
      <strong>
        Error occured while loading {`<${host.tagName.toLowerCase()}>`}
      </strong>
      <p>Values for the following attributes are missing:</p>
      <ul>
        {missingProps.map((prop) => (
          <li>
            <strong>{prop.attribute}</strong>
          </li>
        ))}
      </ul>
      Contact{" "}
      <a target="_blank" href="mailto:support@saasquatch.com">
        support@saasquatch.com
      </a>{" "}
      for assistance.
    </sl-alert>
  );
}
