import { h } from "@stencil/core";

export default {
  title: "Components/Brand",
};

const SampleComponents = () => (
  <div style={{ padding: "10px", border: "5px solid #EEE" }}>
    <sl-button type="default">Default</sl-button>
    <sl-button type="primary">Primary</sl-button>
    <sl-button type="success">Success</sl-button>
    <sl-button type="neutral">Neutral</sl-button>
    <sl-button type="warning">Warning</sl-button>
    <sl-button type="danger">Danger</sl-button>
    <br />
    <sl-badge type="primary">Primary</sl-badge>
    <sl-badge type="success">Success</sl-badge>
    <sl-badge type="neutral">Neutral</sl-badge>
    <sl-badge type="warning">Warning</sl-badge>
    <sl-badge type="danger">Danger</sl-badge>
    <div class="color-palette">
      <div class="color-palette__name">
        Primary
        <br />
        <code>
          --sl-color-primary-<em>{`{n}`}</em>
        </code>
      </div>
      <div style={{ display: "flex", gap:"5px" }}>
        <ColorSwatch depth={50} />
        <ColorSwatch depth={100} />
        <ColorSwatch depth={200} />
        <ColorSwatch depth={300} />
        <ColorSwatch depth={400} />
        <ColorSwatch depth={500} />
        <ColorSwatch depth={600} />
        <ColorSwatch depth={700} />
        <ColorSwatch depth={800} />
        <ColorSwatch depth={900} />
        <ColorSwatch depth={950} />
      </div>
    </div>
  </div>
);
export const Examples = () => {
  return (
    <div>
      <SampleComponents />
      <sqm-brand brand-color="#FF0000">
        <SampleComponents />
      </sqm-brand>
      <sqm-brand brand-color="#00FF00">
        <SampleComponents />
      </sqm-brand>
      <sqm-brand brand-color="#0000FF">
        <SampleComponents />
      </sqm-brand>
      <sqm-brand brand-color="#000000">
        <SampleComponents />
      </sqm-brand>
    </div>
  );
};

export const Nested = () => {
  return (
    <div>
      Default <SampleComponents />
      <sqm-brand brand-color="#FF0000">
        Red:
        <SampleComponents />
        <sqm-brand brand-color="#00FF00">
          Green:
          <SampleComponents />
          <sqm-brand brand-color="#0000FF">
            Blue:
            <SampleComponents />
            <sqm-brand brand-color="#000000">
              Black:
              <SampleComponents />
            </sqm-brand>
          </sqm-brand>
        </sqm-brand>
      </sqm-brand>
    </div>
  );
};
function ColorSwatch({ depth }: { depth: number }) {
  return (
    <div
      style={{
        backgroundColor: `var(--sl-color-primary-${depth})`,
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {depth}
    </div>
  );
}
