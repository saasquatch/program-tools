import { Given } from "../registry.ts";
import { getWorld } from "../world.ts";

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
