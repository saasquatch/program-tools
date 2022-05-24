import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { o as oe, $ as $n, w as we, y as ye, j as jn } from './index.module-b74a7f69.js';
import { o as m, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import './extends-c31f1eff.js';

async function useGraphQLClientProvider({ domain }) {
  const token = oe();
  const appDomain = domain;
  const tenantAlias = $n();
  // Memoization is shared. One client per domain, tenant and token (or null)
  const managedIdentityClient = we(appDomain, tenantAlias, token);
  const [, setGraphQLClient] = m(ye, managedIdentityClient);
  useEffect(() => {
    setGraphQLClient(managedIdentityClient);
  }, [managedIdentityClient]);
}

let GraphQLClientProvider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    false && jn()
      ? useGraphQLClientProviderDemo(this)
      : useGraphQLClientProvider(this);
    return (h$1(Host, { style: { display: "contents" } }, h$1("slot", null)));
  }
};
function useGraphQLClientProviderDemo({ domain }) {
  return domain;
}

export { GraphQLClientProvider as sqm_graphql_client_provider };
