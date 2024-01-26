import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";

export interface DocusignWrapperSlotViewProps {
  states: {
    loading: boolean;
    formState: {
      docusignSlot: VNode;
      completedTaxForm: boolean;
      errors?: any;
    };
  };
  callbacks: {
    onChange: (e) => void;
  };
  text: {};
}

const style = {
  Container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
  },
  RadioContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
  },
  DescriptionText: {
    color: "var(--sl-color-neutral-500)",
    lineHeight: "22px",
  },
  BoldText: {
    fontWeight: "bold",
  },

  Link: {
    color: "#14B1F7",
    textDecoration: "none",
    "&:visited": {
      color: "#14B1F7",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }
    * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
    }

    sl-radio::part(base) {
        align-items: flex-start;
    }
    sl-radio::part(label) {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-width: 600px;
    }
  `;

export const DocusignWrapperSlotView = (
  props: DocusignWrapperSlotViewProps
) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  const { classes } = sheet;

  return (
    <div class={classes.Container}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>

      <h5 class={classes.BoldText}>W9 Tax Form</h5>
      <p>
        Participants based in the US and partnering with US-based brands need to
        submit a W9 form.{" "}
        <a href="#" class={classes.Link}>
          Not based in the US?
        </a>
      </p>
      {formState.docusignSlot}
      <div>
        <p class={classes.BoldText}>Form submission</p>
        <sl-checkbox checked={formState.completedTaxForm}>
          I have completed and submitted my tax form
        </sl-checkbox>
      </div>
    </div>
  );
};
