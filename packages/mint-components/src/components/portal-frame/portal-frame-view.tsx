import { VNode, h } from "@stencil/core";

export interface PortalFrameViewProps {
  states: {
    includeDropdown: boolean;

    styles: {
      headertext: string;
      description: string;
    };
  };
  data: {
    email: string;
  };
}

export function PortalFrameView(props: PortalFrameViewProps, children: VNode) {
  const { states, data } = props;
  const { styles } = states;
  return (
    <div class="Wrapper">
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "var(--sl-font-size-large)",
              fontWeight: "bold",
            }}
          >
            {styles.headertext}
          </span>
          <span style={{ fontSize: "var(--sl-font-size-small)" }}>
            {styles.description}
          </span>
        </div>
        {states.includeDropdown && (
          <sl-dropdown>
            <sl-button slot="trigger" caret>
              Menu
            </sl-button>
            <sl-menu>
              {/* Should really populate from array */}
              <sl-menu-item value="dashboard">Dashboard</sl-menu-item>
              <sl-menu-item value="edit-profile">Edit Profile</sl-menu-item>
              <sl-menu-divider></sl-menu-divider>
              <sl-menu-item value="bye">Logout</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
        )}
      </div>
      {children}
      <div class="FooterWrapper">
        <span>Need help? {data.email}</span>
      </div>
    </div>
  );
}
