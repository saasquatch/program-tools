import { h, r as registerInstance, j as Host } from './index-832bd454.js';
import { m as useState, n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { d as dist, M, i as ie, a as sn, P, j as jn } from './index.module-b74a7f69.js';
import { R as ReferralIframeView } from './sqm-referral-iframe-view-47de5357.js';
import { c as cjs } from './cjs-e829b75b.js';
import { a as getMissingProps, g as getProps } from './utils-48175026.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import './extends-c31f1eff.js';

const GET_USER_DETAILS = dist.gql `
  query getUser($programId: ID) {
    viewer {
      ... on User {
        referralCode(programId: $programId)
      }
    }
  }
`;
function useReferralIframe(props) {
  var _a;
  const programId = M();
  const user = ie();
  const { data } = sn(GET_USER_DETAILS, { programId }, !(user === null || user === void 0 ? void 0 : user.jwt) || !programId);
  return {
    states: {
      content: props,
    },
    data: {
      shareCode: (_a = data === null || data === void 0 ? void 0 : data.viewer) === null || _a === void 0 ? void 0 : _a.referralCode,
    },
  };
}

const style = {
  IconStyle: {
    display: "block",
    position: "absolute",
    top: "23px",
  },
  DivStyle: {
    marginLeft: "30px",
  },
  Details: {
    marginLeft: "30px",
  },
  Heading: {
    display: "inline-block",
  },
  Alert: {
    margin: "30px",
  },
};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
function RequiredPropsError({ missingProps }) {
  if (!missingProps)
    return false;
  const host = P();
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (h("sl-alert", { type: "danger", open: true, class: sheet.classes.Alert },
    h("style", { type: "text/css" }, styleString),
    h("div", { slot: "icon", class: sheet.classes.IconStyle },
      h("sl-icon", { name: "exclamation-octagon" })),
    h("div", { class: sheet.classes.DivStyle },
      h("h2", { class: sheet.classes.Heading }, "There was a problem loading this page"),
      h("p", null, "There was a technical problem that prevented this page from loading. Please contact us with the link to this page.")),
    h("details", { class: sheet.classes.Details },
      h("summary", { onClick: () => setDetailsOpen(!detailsOpen) },
        detailsOpen ? "Less" : "More",
        " details"),
      h("p", null,
        "Error occured while loading ",
        `<${host.tagName.toLowerCase()}>`,
        ". Values for the following attributes are missing:"),
      h("ul", null, missingProps.map((prop) => (h("li", null,
        h("strong", null, prop.attribute))))))));
}

let SqmReferralIframe = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Height of the iframe container
     */
    this.iframeHeight = "100%";
    /**
     * @uiName Width of the iframe container
     */
    this.iframeWidth = "100%";
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const missingProps = getMissingProps([
      {
        attribute: "iframe-src",
        value: this.iframeSrc,
      },
    ]);
    if (missingProps) {
      return h(RequiredPropsError, { missingProps: missingProps });
    }
    const { states, data } = jn()
      ? useReferralIframeDemo(getProps(this))
      : useReferralIframe(getProps(this));
    return (h(Host, { style: { display: "contents" } }, h(ReferralIframeView, { data: data, states: states })));
  }
};
function useReferralIframeDemo(props) {
  return cjs({
    states: {
      content: {
        iframeSrc: "https://example.com",
        ...props,
      },
    },
    data: {
      shareCode: "SHARECODE123",
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { SqmReferralIframe as sqm_referral_iframe };
