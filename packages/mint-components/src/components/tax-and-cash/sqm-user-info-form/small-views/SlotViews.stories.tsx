import { h } from "@stencil/core";
import {
  IndirectDetailsSlotView,
  IndirectDetailsSlotViewProps,
} from "./IndirectTaxDetailsView";
import { indirectDetailsSlotText } from "../defaultTextCopy";
import {
  TaxFormSelectionSlotView,
  TaxFormSelectionSlotViewProps,
} from "./TaxFormSelectionView";
import {
  DocusignWrapperSlotView,
  DocusignWrapperSlotViewProps,
} from "./DocusignWrapperView";

export default {
  title: "Components/Tax Form Slot Views",
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
  data: {
    countries: [{ countryCode: "CA", displayName: "Canada" }],
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
  data: {
    countries: [{ countryCode: "CA", displayName: "Canada" }],
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
