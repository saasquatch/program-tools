import { h } from "@stencil/core";
import {
  NameFieldsView,
  NameFieldsViewProps,
} from "../components/sqm-name-fields/sqm-name-fields-view";
import scenario from "../components/sqm-name-fields/sqm-name-fields.feature";

export default {
  title: "Name Fields",
  parameters: {
    scenario,
  },
};

const props: NameFieldsViewProps = {
  states: { validationErrors: undefined },
};

const errorProps: NameFieldsViewProps = {
  states: {
    validationErrors: {
      firstName: "Cannot be empty",
      lastName: "Cannot be empty",
    },
  },
};

export const NameFields = () => {
  return <NameFieldsView {...props} />;
};

export const NameFieldsWithErrors = () => {
  return <NameFieldsView {...errorProps} />;
};
