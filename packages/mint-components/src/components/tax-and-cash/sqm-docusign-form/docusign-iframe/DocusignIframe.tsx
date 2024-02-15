import { h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";
import { useCallback, useEffect } from "@saasquatch/universal-hooks";

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
    url: string;
    status: DocusignStatus;
  };
  callbacks: {
    onStatusChange: (status: DocusignStatus) => void;
  };
  text: {
    docusignExpired: string;
    docusignCompleted: string;
  };
}

const style = {
  DocusignStatusContainer: {
    width: "100%",
    height: "600px",
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
        <p style={{ margin: "0" }}>{text.docusignExpired}</p>
      </div>
    </div>
  );
};

// export const DocusignCompletedView = (props: {
//   text: DocusignIframeProps["text"];
// }) => {
//   const { classes } = sheet;
//   const { text } = props;
//   return (
//     <div>
//       <style type="text/css">{styleString}</style>
//       <div class={classes.DocusignStatusContainer}>
//         <sl-icon
//           style={{
//             width: "50px",
//             height: "50px",
//             color: "var(--sl-color-success-600)",
//           }}
//           name="check2-circle"
//         ></sl-icon>
//         <p style={{ margin: "0" }}>{text.docusignCompleted}</p>
//       </div>
//     </div>
//   );
// };

export const DocusignIframe = ({
  states,
  callbacks,
  text,
}: DocusignIframeProps) => {
  const callback = useCallback((e) => {
    // TODO: CHANGE THIS WHEN ACTUAL URL IS AVAILABLE
    if (e.origin !== "https://staging.referralsaasquatch.com") return;
    if (!e.data) return;

    callbacks.onStatusChange(e.data.eventStatus);
  }, []);

  useEffect(() => {
    window.addEventListener("message", callback);
    return () => {
      window.removeEventListener("message", callback);
    };
  }, []);

  if (states.status === "ttl_expired")
    return <DocusignExpiredView text={text} />;

  // AL: Skip to next step immediatley after states.status === "signing_complete", don't have to show Completed View
  // if (states.status === "signing_complete")
  //   return <DocusignCompletedView text={text} />;

  return <iframe src={states.url} width="100%" height="600px"></iframe>;
};
