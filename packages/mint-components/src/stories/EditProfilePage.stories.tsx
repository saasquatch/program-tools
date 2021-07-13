import { h } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";

export default {
  title: "Edit Profile Page",
};

const style = {
  Header: {
    "margin-bottom": "50px",
    color: "#555555",
  },

  FormHeader: {
    "margin-bottom": "34px",
    color: "#555555",
  },

  NameContainer: {
    display: "flex",
    "margin-bottom": "32px",
    "& > :not(:last-child)": {
      "margin-right": "32px",
    },
  },

  InputStyle: {
    "max-width": "510px",
    "margin-bottom": "32px",
  },
};

jss.setup(preset());
const sheet = jss.createStyleSheet(style);
const styleString = sheet.toString();

export const Default = () => {
  return (
    <div>
      <style type="text/css">{styleString}</style>
      <h1 class={sheet.classes.Header}>Edit your profile</h1>
      <h2 class={sheet.classes.FormHeader}>Personal Information</h2>

      <form>
        <div class={sheet.classes.NameContainer}>
          <sl-input label="First Name"></sl-input>
          <sl-input label="Last Name"></sl-input>
        </div>
        <sl-input class={sheet.classes.InputStyle} label="Email"></sl-input>
        <sl-input class={sheet.classes.InputStyle} label="Country"></sl-input>
        <sl-button style={{ marginBottom: "54px" }}>Submit Changes</sl-button>
      </form>

      <hr />

      <h2 style={{ marginTop: "43px", marginBottom: "19px" }}>Password</h2>
      <sl-button>Change your password...</sl-button>
    </div>
  );
};
