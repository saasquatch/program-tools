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
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "default"
    | "text";
  size?: "small" | "medium" | "large";

  icon?: string;
  hideIcon?: boolean;
  hideText?: boolean;
  iconSlot?: "prefix" | "suffix";
  onClick?: () => void;
  hide?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
  textColor?: string;
}

const medium = {
  facebook: { color: "#1877f2", text: "#fff", icon: "facebook" },
  twitter: { color: "#1da1f2", text: "#fff", icon: "twitter" },
  email: { color: "#666666", text: "#fff", icon: "envelope" },
  direct: { color: "var(--sl-color-primary-500)", text: "#fff", icon: "send" },
  linkedin: { color: "#0077b5", text: "#fff", icon: "linkedin" },
  sms: { color: "#34DA50", text: "#fff", icon: "chat" },
  fbmessenger: { color: "#0084ff", text: "#fff", icon: "messenger" },
  whatsapp: { color: "#25d366", text: "#fff", icon: "whatsapp" },
  linemessenger: { color: "#00B300", text: "#fff", icon: "line" },
  pinterest: { color: "#e60023", text: "#fff", icon: "pinterest" },
};

export function ShareButtonView(props: ShareButtonViewProps, children: VNode) {
  const vanillaStyle = `
    *::part(base) {
     border: none;
			--sl-focus-ring-color-primary: ${
        props.backgroundColor
          ? props.backgroundColor
          : props.medium
          ? medium[props.medium].color
          : ""
      }80!important;

      background: ${
        props.backgroundColor
          ? props.backgroundColor
          : props.medium
          ? medium[props.medium].color
          : ""
      };
      color: ${
        props.textColor
          ? props.textColor
          : props.medium
          ? medium[props.medium].text
          : ""
      };
      border-radius: ${props.borderRadius ? props.borderRadius + "px" : ""};
    }

	*::part(base):hover {
		border-color: ${
      props.backgroundColor
        ? props.backgroundColor
        : props.medium
        ? medium[props.medium].color
        : ""
    }D1!important;
	}
	
	*::part(base):focus {
		border-color: ${
      props.backgroundColor
        ? props.backgroundColor
        : props.medium
        ? medium[props.medium].color
        : ""
    }D1!important;
	}

	*::part(label) {
		position: relative;
		top: 2%;
	}
  `;

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

  return props.hide ? (
    <Host style={{ display: "none" }}></Host>
  ) : (
    <div>
      <style type="text/css">{styleString}</style>
      <style type="text/css">{vanillaStyle}</style>
      <sl-button
        class={sheet.classes.buttonStyle}
        loading={props.loading}
        disabled={props.disabled}
        pill={props.pill}
        size={props.size}
        type={props.type}
        onClick={props.onClick}
        exportparts={`base: ${props.type}sharebutton-base`}
      >
        {!props.hideIcon && (
          <sl-icon
            slot={props.iconSlot || "prefix"}
            name={props.icon ? props.icon : medium[props.medium].icon}
            exportparts="icon"
          ></sl-icon>
        )}
        {!props.hideText && children}
      </sl-button>
    </div>
  );
}
