import { h } from "@stencil/core";
import { NameFieldsView, NameFieldsViewProps } from "./sqm-name-fields-view";
import scenario from "../sqm-name-fields/sqm-name-fields.feature";

export default {
  title: "Components/Name Fields",
  parameters: {
    scenario,
  },
};

const props: NameFieldsViewProps = {
  states: {
    validationErrors: undefined,
    content: {
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
    },
  },
};

const errorProps: NameFieldsViewProps = {
  states: {
    validationErrors: {
      firstName: "Cannot be empty",
      lastName: "Cannot be empty",
    },
    content: {
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
    },
  },
};

export const NameFields = () => {
  return <NameFieldsView {...props} />;
};

export const NameFieldsWithErrors = () => {
  return <NameFieldsView {...errorProps} />;
};
