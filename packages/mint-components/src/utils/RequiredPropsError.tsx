import { useHost } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { intl } from "../global/global";
import { createStyleSheet } from "../styling/JSS";
export type RequiredPropsErrorProps = {
  missingProps:
    | {
        attribute: string;
        value: string | boolean | number;
      }[]
    | false;
  heading?: string;
  subheading?: string;
  description?: string;
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
  Children: {
    display: "none",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function RequiredPropsError(
  {
    missingProps,
    heading = "There was a problem loading this section",
    subheading = "There was a technical problem that prevented this section from loading. Please contact us with the link to this page.",
    description = "Error occured while loading <{tagName}>. Values for the following attributes are missing:",
  }: RequiredPropsErrorProps,
  children
) {
  if (!missingProps) return false;
  const host = useHost();
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <sl-alert type="danger" open>
      <style type="text/css">{styleString}</style>
      <div slot="icon" class={sheet.classes.IconStyle}>
        <sl-icon name="exclamation-octagon"></sl-icon>
      </div>
      <div class={sheet.classes.DivStyle}>
        <h2 class={sheet.classes.Heading}>
          {intl.formatMessage({
            id: `error-heading`,
            defaultMessage: heading,
          })}
        </h2>
        <p>
          {intl.formatMessage({
            id: `error-subheading`,
            defaultMessage: subheading,
          })}
        </p>
      </div>
      <details class={sheet.classes.Details}>
        <summary onClick={() => setDetailsOpen(!detailsOpen)}>
          {detailsOpen ? "Less" : "More"} details
        </summary>
        <p>
          {intl.formatMessage(
            {
              id: `error-description`,
              defaultMessage: description,
            },
            { tagName: host.tagName.toLowerCase() }
          )}
        </p>
        <ul>
          {missingProps.map((prop) => (
            <li>
              <strong>{prop.attribute}</strong>
            </li>
          ))}
        </ul>
      </details>
      <div class={sheet.classes.Children}>{children}</div>
    </sl-alert>
  );
}
