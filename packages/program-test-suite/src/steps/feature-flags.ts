import { StepDefinitions } from "jest-cucumber";
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
};

export default featureSteps;
