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
    editText: string;
    headerText: string;
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

  TitleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "var(--sl-spacing-x-small)",
    gridColumn: "1 / 3",
    "@media screen and (max-width: 499px)": {
      gridColumn: "1 / 2",
    },
  },

  EditButton: {
    "@media screen and (min-width: 500px)": {
      width: "max-content",
      marginLeft: "auto",
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

  if (!hasAccount || integrationDisabled) return "";

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  return (
    <div class={classes.Container}>
      <style type="text/css">{styleString}</style>{" "}
      <div class={classes.TitleContainer}>
        <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665703368/tenant_test_a8b41jotf8a1v/tjfxf0qxu2lwqzgtcghw.svg" />
        <h2>{overviewContent.headerText}</h2>
      </div>
      <sl-button
        class={classes.EditButton}
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          props.setOpen(true);
        }}
      >
        {overviewContent.editText}
      </sl-button>
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
