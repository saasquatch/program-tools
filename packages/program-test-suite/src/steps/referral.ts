import { StepDefinitions } from "jest-cucumber";
import { inferType } from "@saasquatch/program-boilerplate";

import { getWorld } from "../world";

const referralSteps: StepDefinitions = ({ given }) => {
  given(
    /^the referral has field (\S+) equal to (\S+)$/,
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
