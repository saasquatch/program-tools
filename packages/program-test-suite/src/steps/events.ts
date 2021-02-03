import { StepDefinitions } from "jest-cucumber";

import { getWorld } from "../world";

const eventSteps: StepDefinitions = ({ given }) => {
  given("there are no events", () => {
    getWorld().setState({
      current: {
        events: [],
      },
    });
  });

  given("the following event exists:", (data: any) => {
    getWorld().setState({
      current: {
        events: [...(getWorld().state.current.events || []), JSON.parse(data)],
      },
    });
  });
};

export default eventSteps;
