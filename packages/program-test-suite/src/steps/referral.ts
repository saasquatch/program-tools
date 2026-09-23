import { inferType } from "@saasquatch/program-boilerplate";
import { Given } from "../registry.ts";
import { getWorld } from "../world.ts";

Given(
  /^the referral has field "?([^"]+)"? equal to "?([^"]+)"?$/,
  (key: string, value: string) => {
    getWorld().setState({
      current: {
        referral: {
          [key]: inferType(value),
        },
      },
    });
  },
);
