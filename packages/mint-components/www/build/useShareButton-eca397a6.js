import { h, j as Host } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { H as HostBlock } from './mixins-d2de6ff8.js';
import { d as dist, M, i as ie, R as Rn, a as sn, k as kn } from './index.module-b74a7f69.js';

const medium = {
  facebook: "#1877f2",
  twitter: "#1da1f2",
  email: "#f8cc07",
  direct: "#cd3292",
  linkedin: "#0077b5",
  sms: "#e68523",
  fbmessenger: "#0084ff",
  whatsapp: "#25d366",
  linemessenger: "#00C72A",
  pinterest: "#e60023",
  reminder: "#b1a24a",
  unknown: "#33482c",
};
function ShareButtonView(props, children) {
  const vanillaStyle = `
    *::part(base) {
      background: ${props.backgroundcolor
    ? props.backgroundcolor
    : props.medium
      ? medium[props.medium]
      : ""};
      color: ${props.textcolor ? props.textcolor : props.medium ? "#fff" : ""};
      border-radius: ${props.borderradius ? props.borderradius + "px" : ""};
    }
    *::part(label) {
    //   position: relative;
	//   top: 5%;
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
  return props.hide ? (h(Host, { style: { display: "none" } })) : (h("div", null,
    h("style", { type: "text/css" }, styleString),
    h("style", { type: "text/css" }, vanillaStyle),
    h("sl-button", { class: sheet.classes.buttonStyle, loading: props.loading, disabled: props.disabled, pill: props.pill, size: props.size, type: props.type, onClick: props.onClick, exportparts: `base: ${props.type}sharebutton-base` },
      !props.hideicon && (h("sl-icon", { slot: props.iconslot, name: props.icon ? props.icon : props.medium, exportparts: "icon" })),
      !props.hidetext && children)));
}

const MessageLinkQuery = dist.gql `
  query (
    $programId: ID
    $engagementMedium: UserEngagementMedium!
    $shareMedium: ReferralShareMedium!
  ) {
    viewer {
      ... on User {
        messageLink(
          programId: $programId
          engagementMedium: $engagementMedium
          shareMedium: $shareMedium
        )
        shareLink(programId: $programId, engagementMedium: $engagementMedium)
      }
    }
  }
`;
function NativeShare(props, directLink) {
  const title = props.sharetitle || "Share title";
  const text = props.sharetext || "Share text";
  if (directLink === "undefined") {
    return alert("error: message link undefined!");
  }
  if (window.navigator.share) {
    window.navigator
      .share({
      title,
      text,
      url: directLink,
    })
      .catch((error) => console.error("Error on web share", error));
  }
  else {
    alert("Not on a supported device");
  }
}
function FacebookShare(directLink, res) {
  var _a, _b;
  if (((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.messageLink) === "undefined" ||
    directLink === "undefined") {
    return alert("error: message link undefined!");
  }
  if (typeof SquatchAndroid.shareOnFacebook !== "undefined") {
    return SquatchAndroid.shareOnFacebook(directLink, res.data.viewer.messageLink);
  }
  else {
    return GenericShare(res);
  }
}
function GenericShare(res) {
  var _a, _b;
  return ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.messageLink)
    ? window.open(res.data.viewer.messageLink)
    : alert("error: message link undefined!");
}
function useShareButton(props) {
  var _a, _b;
  const { sharetitle, sharetext, medium } = props;
  const programId = props.programId ? props.programId : M();
  const user = ie();
  const variables = {
    engagementMedium: Rn(),
    programId: programId,
    shareMedium: medium.toUpperCase(),
  };
  // only queries if a programId is available
  const res = sn(MessageLinkQuery, variables, !(user === null || user === void 0 ? void 0 : user.jwt) || !programId);
  const directLink = (_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.shareLink;
  const environment = kn();
  const hide = (medium.toLocaleUpperCase() === "SMS" &&
    window.orientation === undefined) ||
    (medium.toLocaleUpperCase() === "DIRECT" && !window.navigator.share);
  function onClick() {
    if (medium.toLocaleUpperCase() === "FACEBOOK" &&
      environment.type === "SquatchAndroid") {
      FacebookShare(directLink, res);
    }
    else if (medium.toLocaleUpperCase() === "DIRECT") {
      NativeShare({ sharetitle, sharetext }, directLink);
    }
    else {
      GenericShare(res);
    }
  }
  return { ...props, loading: res.loading, onClick, hide };
}

export { ShareButtonView as S, useShareButton as u };
