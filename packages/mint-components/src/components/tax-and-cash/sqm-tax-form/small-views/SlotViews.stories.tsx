import { h } from "@stencil/core";
import {
  IndirectDetailsSlotView,
  IndirectDetailsSlotViewProps,
} from "./IndirectTaxDetailsView";
import { indirectDetailsSlotText } from "../defaultTextCopy";

export default {
  title: "Components/Slot Views",
};

const registeredInOtherRegion: IndirectDetailsSlotViewProps = {
  states: {
    loading: false,
    formState: {
      registeredIn: "otherRegion",
      selectedRegion: "United Kindom",
      vatNumber: 12345,
    },
  },
  callbacks: {
    onChange: (e) => console.log("Submit"),
  },
  text: {
    selectedRegion: indirectDetailsSlotText.selectedRegion,
    vatNumber: indirectDetailsSlotText.vatNumber,
  },
};

const registeredInCanada: IndirectDetailsSlotViewProps = {
  states: {
    loading: false,
    formState: {
      registeredIn: "canada",
      province: "British Columbia",
      indirectTaxNumber: 1234,
    },
  },
  callbacks: {
    onChange: (e) => console.log("Submit"),
  },
  text: {
    province: indirectDetailsSlotText.province,
    indirectTaxNumber: indirectDetailsSlotText.indirectTaxNumber,
  },
};

export const RegisteredInOtherRegion = () => {
  return <IndirectDetailsSlotView {...registeredInOtherRegion} />;
};

export const RegisteredInCanada = () => {
  return <IndirectDetailsSlotView {...registeredInCanada} />;
};
