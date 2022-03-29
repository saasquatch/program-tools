import { useHost } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createStyleSheet } from "../styling/JSS";
export type RequiredPropsErrorProps = {
  missingProps:
    | {
        attribute: string;
        value: string | boolean | number;
      }[]
    | false;
};

const style = {
  IconStyle: {
    display: "block",
    position: "absolute",
    top: "23px",
  },
  DivStyle: {
    marginLeft: "28px",
  },
  Details: {
    marginLeft: "28px",
  },
  Heading: {
    display: "inline-block",
  },
  Alert: {
    margin: "28px",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function RequiredPropsError({ missingProps }: RequiredPropsErrorProps) {
  if (!missingProps) return false;
  const host = useHost();
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <sl-alert type="danger" open class={sheet.classes.Alert}>
      <style type="text/css">{styleString}</style>
      <div slot="icon" class={sheet.classes.IconStyle}>
        <sl-icon name="exclamation-octagon"></sl-icon>
      </div>
      <div class={sheet.classes.DivStyle}>
        <h2 class={sheet.classes.Heading}>
          There was a problem loading this section
        </h2>
        <p>
          There was a technical problem that prevented this section from
          loading. Please contact us with the link to this page.
        </p>
      </div>
      <details class={sheet.classes.Details}>
        <summary onClick={() => setDetailsOpen(!detailsOpen)}>
          {detailsOpen ? "Less" : "More"} details
        </summary>
        <p>
          Error occured while loading {`<${host.tagName.toLowerCase()}>`}.
          Values for the following attributes are missing:
        </p>
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
