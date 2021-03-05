import { ContextListener } from "dom-context";

// TODO: -- can we get this from `window.somthing?` as a fallback? Maybe that's something that `dom-context` could provide
const TENANT_CONTEXT = "sq-context:tenant";

export class SQHWidget extends HTMLElement {
  _tenant: string = "test_atzqd37hvovdf";
  _appDomain: string = "https://app.referralsaasquatch.com";
  _widgetType?: string;

  _listener = new ContextListener<string>({
    contextName: TENANT_CONTEXT,
    element: this,
    onChange: (tenant) => {
      this._tenant = tenant;
      this.render();
    },
    onStatus: (status) => {
      switch (status) {
        case "Connected":
        case "Connecting":
        case "Initial":
          // `onChange` should cover these cases
          return;
        case "Timeout":
          this.renderNoTenantError();
      }
    },
  });

  constructor() {
    super();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name !== "widget-type") {
      // Don't observe non-widget-types
      return;
    }
    this._widgetType = newValue;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  renderNoTenantError() {
    this.innerText = `Could not render anything because tenant context is missing. Make sure you have an event listener for "${TENANT_CONTEXT}" that fulfills the dom-context specification`;
  }
  render() {
    fetch(`${this._appDomain}/api/v1/${this._tenant}/graphql`, {
      credentials: "omit",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query {
               __typename
            }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => (this.innerHTML = res.data))
      .catch((err) => (this.innerHTML = err));
  }

  static get observedAttributes() {
    return ["widget-type"];
  }

  /** Registers sqh-widget as a custom element. */
  static register() {
    // @ts-ignore
    customElements.define("sqh-widget", this);
  }
}
