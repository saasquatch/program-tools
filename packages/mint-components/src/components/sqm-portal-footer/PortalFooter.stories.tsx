import { h } from "@stencil/core";
import { PortalFooterView } from "./sqm-portal-footer-view";
import scenario from "../sqm-portal-footer/sqm-portal-footer.feature";

export default {
  title: "Components/Microsite Footer",
  parameters: {
    scenario,
  },
};

const defaultProps = {
  supportEmail: "support@example.com",
  supportText: "For program support, contact {email}",
  hidePoweredBy: false,
  poweredByLink: "https://impact.com/advocate/",
  paddingTop: "large",
  paddingRight: "large",
  paddingBottom: "large",
  paddingLeft: "large",
};

export const DefaultFooter = () => <PortalFooterView {...defaultProps} />;

export const FooterWithTerms = () => (
  <PortalFooterView
    {...defaultProps}
    termsLink="https://example.com"
    termsText="Terms and Conditions"
  />
);

export const FooterWithFAQ = () => (
  <PortalFooterView
    {...defaultProps}
    faqLink="https://example.com"
    faqText="FAQ"
  />
);

export const FooterWithTermsAndFAQ = () => (
  <PortalFooterView
    {...defaultProps}
    termsLink="https://example.com"
    termsText="Terms and Conditions"
    faqLink="https://example.com"
    faqText="FAQ"
  />
);

export const FooterNoPoweredBy = () => (
  <PortalFooterView
    {...defaultProps}
    termsLink="https://example.com"
    termsText="Terms and Conditions"
    faqLink="https://example.com"
    faqText="FAQ"
    hidePoweredBy={true}
  />
);
export const FooterNoSupportText = () => (
  <PortalFooterView
    {...defaultProps}
    termsLink="https://example.com"
    termsText="Terms and Conditions"
    faqLink="https://example.com"
    faqText="FAQ"
    hideSupportText={true}
  />
);
