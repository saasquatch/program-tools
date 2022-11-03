import { h, VNode } from "@stencil/core";
import { StringUnitLength } from "luxon";
import { createStyleSheet } from "../../styling/JSS";

export interface AccountDetailsViewProps {
  loading: boolean;
  setOpen: (open: boolean) => void;
  hasAccount: boolean;
  integrationDisabled: boolean;
  overviewContent: {
    detailsLabel: string;
    scheduleLabel: string;
    detailsContent: VNode;
    ScheduleContent: VNode | VNode[];
  };
}

const FlexContainer = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "10px",
};
const style = {
  Container: {
    display: "grid",
    gridTemplateColumns: "1fr min-content 1fr",
    gridGap: "var(--sl-spacing-medium)",
    "@media screen and (max-width: 499px)": {
      gridTemplateColumns: "1fr",
    },
  },

  Label: {
    fontSize: "var(--sl-font-size-small)",
    margin: "0 0 var(--sl-spacing-medium)",
    "@media screen and (max-width: 499px)": {
      wordWrap: "wrap-word",
    },
  },

  Skeleton: {
    width: "150px",
  },

  Divider: {
    minHeight: "100%",
    width: "1px",
    backgroundColor: "var(--sl-color-gray-200)",
    margin: "auto",
  },

  ScheduleContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "var(--sl-spacing-medium)",
  },
};

export function AccountDetailsView(props: AccountDetailsViewProps) {
  const { overviewContent, hasAccount, loading, integrationDisabled } = props;

  if (!hasAccount) return "";

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  return (
    <div class={classes.Container}>
      <style type="text/css">{styleString}</style>{" "}
      <div>
        <p class={classes.Label}>{overviewContent.detailsLabel}</p>{" "}
        {overviewContent.detailsContent}
      </div>
      <div class={classes.Divider}></div>
      <div>
        <p class={classes.Label}>{overviewContent.scheduleLabel}</p>{" "}
        <div class={classes.ScheduleContainer}>
          {overviewContent.ScheduleContent}
        </div>
      </div>
    </div>
  );
}
