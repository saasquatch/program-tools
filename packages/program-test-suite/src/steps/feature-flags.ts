import { StepDefinitions } from "jest-cucumber";
import { TenantFlavor } from "../types";
import { getWorld } from "../world";

const featureSteps: StepDefinitions = ({ given }) => {
  given(/^the "([A-Z0-9_]+)" feature flag is enabled$/, (flag: string) => {
    const currentFlags = getWorld().state.current.featureFlags;
    getWorld().setState({
      current: {
        featureFlags: Array.isArray(currentFlags)
          ? [...currentFlags, flag]
          : [flag],
      },
    });
  });

  given(/^the flavor is "?(saasquatch|impact)"?$/, (flavor: TenantFlavor) => {
    getWorld().setState({ current: { flavor } });
  });
};

export default featureSteps;
