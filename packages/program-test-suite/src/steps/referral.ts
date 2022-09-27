import { inferType } from "@saasquatch/program-boilerplate";
import { StepDefinitions } from "jest-cucumber";
import { getWorld } from "../world";

const referralSteps: StepDefinitions = ({ given }) => {
  given(
    /^the referral has field "?([^"]+)"? equal to "?([^"]+)"?$/,
    (key: string, value: string) => {
      getWorld().setState({
        current: {
          referral: {
            [key]: inferType(value),
          },
        },
      });
    }
  );
};

export default referralSteps;
