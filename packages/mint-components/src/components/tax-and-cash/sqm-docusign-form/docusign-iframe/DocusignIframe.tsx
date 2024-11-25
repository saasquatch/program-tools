import { h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
import {
  DOCUSIGN_EXPIRED_STATES,
  DOCUSIGN_ERROR_STATES,
} from "../useDocusignForm";
import { MinHeight } from "../../../sqm-hero/Hero.stories";

export type DocusignStatus =
  | "ttl_expired"
  | "signing_complete"
  | "cancel"
  | "delete"
  | "exception"
  | "fax_pending"
  | "session_timeout"
  | "viewing_complete";

export interface DocusignIframeProps {
  states: {
    status: DocusignStatus;
    loading: boolean;
    urlLoading: boolean;
  };
  data: {
    documentUrl: string | undefined;
  };
  callbacks: {
    completeDocument: () => Promise<void>;
  };
  text: {
    docusignExpired: string;
    docusignError: string;
    refreshButton: string;
  };
}

const style = {
  DocusignStatusContainer: {
    width: "100%",
    minHeight: "600px",
    height: "900px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
    margin: "auto",
    textAlign: "center",
    border: "1px solid var(--sl-color-gray-200)",
    justifyContent: "center",
  },
  MessageContainer: {
    maxWidth: "400px",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export const DocusignExpiredView = (props: {
  text: DocusignIframeProps["text"];
}) => {
  const { classes } = sheet;
  const { text } = props;
  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={classes.DocusignStatusContainer}>
        <sl-icon
          style={{
            width: "50px",
            height: "50px",
            color: "var(--sl-color-neutral-500)",
          }}
          name="clock"
        ></sl-icon>
        <div class={classes.MessageContainer}>
          <p style={{ margin: "0" }}>{text.docusignExpired}</p>
        </div>
        <sl-button type="primary" onClick={() => window.location.reload()}>
          {text.refreshButton}
        </sl-button>
      </div>
    </div>
  );
};

export const DocusignErrorView = (props: {
  text: DocusignIframeProps["text"];
}) => {
  const { classes } = sheet;
  const { text } = props;
  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={classes.DocusignStatusContainer}>
        <sl-icon
          style={{
            width: "50px",
            height: "50px",
            color: "var(--sl-color-gray-500)",
          }}
          name="exclamation-octagon"
        ></sl-icon>
        <div class={classes.MessageContainer}>
          <p style={{ margin: "0" }}>{text.docusignError}</p>
        </div>
        <sl-button type="primary" onClick={() => window.location.reload()}>
          {text.refreshButton}
        </sl-button>
      </div>
    </div>
  );
};

export const DocusignLoadingView = () => {
  const { classes } = sheet;
  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={classes.DocusignStatusContainer}>
        <sl-spinner style={{ fontSize: "50px", margin: "40px" }}></sl-spinner>
      </div>
    </div>
  );
};

export const DocusignIframe = ({
  states,
  data,
  callbacks,
  text,
}: DocusignIframeProps) => {
  const [iFrameHeight, setiFrameHeight] = useState<string>("100%");

  // TODO: Confirm impact domain before launch
  const allowedDomains = [
    "referralsaasquatch.com",
    "impacttech.complysandbox.com",
  ];

  const callback = useCallback((e) => {
    const allowed = allowedDomains.some((d) => e.origin?.includes(d));
    if (!allowed) return;

    if (typeof e.data === "number") {
      setiFrameHeight(e.data + "px");
    }

    if (e.data === "Complyexchange Thank you page Load") {
      callbacks.completeDocument();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", callback, false);
    return () => {
      window.removeEventListener("message", callback, false);
    };
  }, []);

  if (states.urlLoading) return <DocusignLoadingView />;

  if (DOCUSIGN_ERROR_STATES.includes(states.status)) {
    return <DocusignErrorView text={text} />;
  }

  if (DOCUSIGN_EXPIRED_STATES.includes(states.status))
    return <DocusignExpiredView text={text} />;

  return (
    <iframe
      scrolling="yes"
      frameBorder="0"
      src={data.documentUrl}
      width="100%"
      height={iFrameHeight}
    ></iframe>
  );
};
