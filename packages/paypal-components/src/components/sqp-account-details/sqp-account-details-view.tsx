import { h, VNode } from "@stencil/core";
import { StringUnitLength } from "luxon";
import { createStyleSheet } from "../../styling/JSS";
import { PortalSectionView } from "../sqp-titled-section/sqp-portal-section-view";

export interface AccountDetailsViewProps {
  loading: boolean;
  setOpen: (open: boolean) => void;
  hasAccount: boolean;
  integrationDisabled: boolean;
  integrationPaused: boolean;
  detailsHeaderText: string;
  scheduleHeaderText: string;
  detailsSlot: VNode;
  scheduleSlot: VNode | VNode[];
  editText: string;
  integrationDisabledHeader: string;
  integrationDisabledText: string;
  integrationPausedHeader: string;
  integrationPausedText: string;
  payPalAccountHeaderText: string;
  connectPayPalDescriptionText: string;
  connectPayPalAccountButtonText: string;
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
    background: "var(--sl-color-neutral-0)",

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

  EditButton: {
    "@media screen and (min-width: 500px)": {
      width: "max-content",
      marginLeft: "auto",
    },
  },

  HeaderContainer: {
    display: "grid",
    alignItems: "center",
    gap: "var(--sl-spacing-medium)",
    gridTemplateColumns: "1fr max-content",
    "@media screen and (max-width: 499px)": {
      gridTemplateColumns: "1fr",
    },
  },

  TitleContainer: {
    display: "grid",
    alignItems: "center",
    gap: "var(--sl-spacing-x-small)",
    gridTemplateColumns: "max-content max-content",
  },

  ContentContainer: {
    marginBottom: "var(--sl-spacing-medium)",
    background: "var(--sl-color-neutral-0)",
  },

  DescriptionText: {
    margin: "0",
    color: "var(--sl-color-500)",
    fontSize: "var(--sl-font-size-medium)",
    marginTop: "var(--sl-spacing-medium)",
  },
};

export function AccountDetailsView(props: AccountDetailsViewProps) {
  const {
    hasAccount,
    loading,
    integrationDisabled,
    integrationPaused,
    editText,
    payPalAccountHeaderText,
    integrationDisabledHeader,
    integrationDisabledText,
    integrationPausedHeader,
    integrationPausedText,
    detailsHeaderText,
    detailsSlot,
    scheduleHeaderText,
    scheduleSlot,
    connectPayPalDescriptionText,
    connectPayPalAccountButtonText,
    setOpen,
  } = props;

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const { classes } = sheet;

  return (
    <div>
      <PortalSectionView
        {...{
          labelMargin: "medium",
          padding: "none",
          label: (
            <div>
              <div class={classes.HeaderContainer}>
                <div class={classes.TitleContainer}>
                  <img src="https://res.cloudinary.com/saasquatch-staging/image/upload/v1665703368/tenant_test_a8b41jotf8a1v/tjfxf0qxu2lwqzgtcghw.svg" />
                  <h2>{payPalAccountHeaderText}</h2>
                </div>
                {!integrationDisabled && props.hasAccount && (
                  <sl-button
                    class={classes.EditButton}
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(true);
                    }}
                  >
                    {editText}
                  </sl-button>
                )}
              </div>
              {!integrationDisabled && !hasAccount && (
                <p class={classes.DescriptionText}>
                  {connectPayPalDescriptionText}
                </p>
              )}
            </div>
          ),
          content: (
            <div class={classes.ContentContainer}>
              {integrationDisabled && (
                <sl-alert open type="primary">
                  <sl-icon slot="icon" name="info-circle"></sl-icon>
                  <b>{integrationDisabledHeader}</b>
                  <br />
                  {integrationDisabledText}
                </sl-alert>
              )}
              {integrationPaused && (
                <sl-alert open type="primary">
                  <sl-icon slot="icon" name="info-circle"></sl-icon>
                  <b>{integrationPausedHeader}</b>
                  <br />
                  {integrationPausedText}
                </sl-alert>
              )}
              {!props.hasAccount && (
                <sl-button disabled={loading} onClick={() => setOpen(true)}>
                  {connectPayPalAccountButtonText}
                </sl-button>
              )}
            </div>
          ),
        }}
      >
        <style type="text/css">{styleString}</style>
      </PortalSectionView>
      {props.hasAccount && !integrationDisabled && (
        <div class={classes.Container}>
          <style type="text/css">{styleString}</style>{" "}
          <div>
            <p class={classes.Label}>{detailsHeaderText}</p> {detailsSlot}
          </div>
          <div class={classes.Divider}></div>
          <div>
            <p class={classes.Label}>{scheduleHeaderText}</p>{" "}
            <div class={classes.ScheduleContainer}>{scheduleSlot}</div>
          </div>
        </div>
      )}
    </div>
  );
}
