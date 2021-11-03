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
  DivStyle: {
    display: "block",
    position: "absolute",
    top: "18px",
  },
  IconStyle: {
    "&::part(icon)": {},
  },
  Details: {
    marginLeft: "30px",
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export function RequiredPropsError({ missingProps }: RequiredPropsErrorProps) {
  if (!missingProps) return false;
  const host = useHost();
  return (
    <sl-alert type="danger" open class={sheet.classes.IconStyle}>
      <style type="text/css">{styleString}</style>
      <div slot="icon" class={sheet.classes.DivStyle}>
        <sl-icon name="exclamation-octagon"></sl-icon>
      </div>
      <details class={sheet.classes.Details}>
        <summary>
          <strong>
            Error occured while loading {`<${host.tagName.toLowerCase()}>`}
          </strong>
        </summary>
        <p>Values for the following attributes are missing:</p>
        <ul>
          {missingProps.map((prop) => (
            <li>
              <strong>{prop.attribute}</strong>
            </li>
          ))}
        </ul>
      </details>
    </sl-alert>
  );
}
