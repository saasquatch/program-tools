import assert from "node:assert/strict";
import type { UserEvent } from "@saasquatch/program-boilerplate/dist/types/saasquatch.d.ts";
import { parseTestNumber } from "../fixtures.ts";
import { Given } from "../registry.ts";
import { getWorld } from "../world.ts";

Given(
  /^event "([^"]+)" has convertedTotalAmountPostDiscount equal to "([^"]+)"$/,
  (id: string, amount: string) => {
    const events: UserEvent[] = getWorld().state.current.events ?? [];
    const event = events.find((candidate) => candidate.id === id);

    assert.ok(event, `Event ${id} does not exist`);

    if (amount === "undefined") {
      delete event.convertedTotalAmountPostDiscount;
    } else if (amount === "null") {
      event.convertedTotalAmountPostDiscount = null;
    } else {
      event.convertedTotalAmountPostDiscount = parseTestNumber(amount);
    }
  },
);

Given("there are no events", () => {
  getWorld().setState({
    current: {
      events: [],
    },
  });
});

Given("the following event exists:", (data: string) => {
  getWorld().setState({
    current: {
      events: [...(getWorld().state.current.events ?? []), JSON.parse(data)],
    },
  });
});
