import { h, Host, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock } from "../../global/mixins";

export interface ShareButtonViewProps {
  medium:
    | "facebook"
    | "twitter"
    | "email"
    | "direct"
    | "linkedin"
    | "sms"
    | "fbmessenger"
    | "whatsapp"
    | "linemessenger"
    | "pinterest"
    | "reminder"
    | "unknown";
  loading?: boolean;
  disabled?: boolean;
  pill?: boolean;
  type?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "default"
    | "text";
  size?: "small" | "medium" | "large";
  border?: string;
  icon?: string;
  hideicon?: boolean;
  hidetext?: boolean;
  iconslot?: "prefix" | "suffix";
  onClick?: () => void;
  hide?: boolean;
  borderradius?: number;
  backgroundcolor?: string;
  textcolor?: string;
  messageLink?: string;
  openInSameTab?: boolean;
  isPlainLink?: boolean;
}

const medium = {
  facebook: { color: "#1877f2", text: "#fff", icon: "facebook" },
  twitter: { color: "#000000", text: "#fff", icon: "twitter-x" },
  email: { color: "#666666", text: "#fff", icon: "envelope" },
  direct: { color: "var(--sl-color-primary-500)", text: "#fff", icon: "send" },
  linkedin: { color: "#0077b5", text: "#fff", icon: "linkedin" },
  sms: { color: "#34DA50", text: "#fff", icon: "chat" },
  fbmessenger: { color: "#0084ff", text: "#fff", icon: "messenger" },
  whatsapp: { color: "#25d366", text: "#fff", icon: "whatsapp" },
  linemessenger: { color: "#00B300", text: "#fff", icon: "line" },
  pinterest: { color: "#e60023", text: "#fff", icon: "pinterest" },
};

const style = {
  HostBlock: HostBlock,
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "0",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

// TODO: Figure out hover and active states
// *::part(base):hover {
// 	border-color: ${
//     props.backgroundcolor
//       ? props.backgroundcolor
//       : props.medium
//       ? medium[props.medium].color
//       : ""
//   }!important;
// }

// *::part(base):focus {
// 	border-color: ${
//     props.backgroundcolor
//       ? props.backgroundcolor
//       : props.medium
//       ? medium[props.medium].color
//       : ""
//   }!important;
// }

export function ShareButtonView(props: ShareButtonViewProps, children: VNode) {
  const vanillaStyle = `
	sl-button::part(base) {
	  border: ${props.border || "none"};
    font-family: var(--sqm-primary-font);

	background: ${
    props.backgroundcolor
      ? props.backgroundcolor
      : props.medium
      ? medium[props.medium].color
      : ""
  };
	color: ${
    props.textcolor
      ? props.textcolor
      : props.medium
      ? medium[props.medium].text
      : ""
  };
	border-radius: ${props.borderradius ? props.borderradius + "px" : ""};
	}



	*::part(label) {
		position: relative;
		top: 2%;
	}
	`;

  return props.hide ? (
    <Host style={{ display: "none" }}></Host>
  ) : (
    <div>
      <style type="text/css">{styleString}</style>
      <style type="text/css">{vanillaStyle}</style>
      <sl-button
        class={sheet.classes.buttonStyle}
        target={props.openInSameTab ? "_self" : "_blank"}
        loading={props.loading}
        disabled={props.disabled}
        pill={props.pill}
        size={props.size}
        type={props.type}
        onClick={!props.isPlainLink ? props.onClick : undefined}
        href={props.isPlainLink ? props.messageLink : undefined}
        exportparts={`base: ${props.type}button-base`}
      >
        {!props.hideicon && (
          <sl-icon
            slot={props.iconslot || "prefix"}
            name={props.icon ? props.icon : medium[props.medium].icon}
            exportparts="base: icon"
          ></sl-icon>
        )}
        {!props.hidetext && children}
      </sl-button>
    </div>
  );
}
