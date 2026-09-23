import { Given } from "../registry.ts";
import type { TenantFlavor } from "../types.ts";
import { getWorld } from "../world.ts";

Given(/^the "([A-Z0-9_]+)" feature flag is enabled$/, (flag: string) => {
  const currentFlags = getWorld().state.current.featureFlags;
  getWorld().setState({
    current: {
      featureFlags: Array.isArray(currentFlags)
        ? [...currentFlags, flag]
        : [flag],
    },
  });
});

Given(/^the flavor is "?(saasquatch|impact)"?$/, (flavor: TenantFlavor) => {
  getWorld().setState({ current: { flavor } });
});

Given(/^the tenant's timezone is "?([^"]+)"?$/, (tz: string) => {
  getWorld().setState({ current: { tenantTimeZone: tz } });
});
