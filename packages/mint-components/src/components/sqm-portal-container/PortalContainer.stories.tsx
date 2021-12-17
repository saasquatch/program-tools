import { h } from "@stencil/core";
import scenario from "./sqm-portal-container.feature";

export default {
  title: "Components/Portal Container",
  parameters: {
    scenario,
  },
};

export const TooWideColumn = () => (
  <div style={{ width: "200px", border: "1px dashed grey" }}>
    <sqm-portal-container>
      <div style={{ background: "grey", border: "1px solid red" }}>Small</div>
      <div style={{ background: "lightblue", width: "1000px" }}>
        Too wide, content goes off the side of the page for ever and is hidden.
      </div>
    </sqm-portal-container>
  </div>
);

export const TooWideRow = () => (
  <div style={{ width: "500px", border: "1px dashed grey" }}>
    <sqm-portal-container direction="row" min-width="160px">
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const HalfWidth = () => (
  <div style={{ width: "1000px", border: "1px dashed grey" }}>
    <sqm-portal-container direction="row" minWidth="160px" maxWidth="50%">
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);

export const FullWidth = () => (
  <div style={{ width: "1000px", border: "1px dashed grey" }}>
    <sqm-portal-container direction="row" maxWidth="100%">
      <sqm-share-button
        icon="envelope"
        medium="email"
        size="medium"
        class="hydrated"
      >
        Email a friend
      </sqm-share-button>
      <sqm-share-button medium="twitter" size="medium" class="hydrated">
        Tweet about us
      </sqm-share-button>
      <sqm-share-button medium="facebook" size="medium" class="hydrated">
        Share on Facebook
      </sqm-share-button>
    </sqm-portal-container>
  </div>
);
