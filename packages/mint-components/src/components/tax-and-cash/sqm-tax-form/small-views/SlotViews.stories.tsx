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

const taxFormSelectionProps: TaxFormSelectionSlotViewProps = {
  states: {
    loading: false,
    formState: {
      selectedTaxForm: undefined,
    },
  },
  callbacks: {
    onChange: (e) => console.log(e),
  },
  text: {},
};

const docusignWrapperProps: DocusignWrapperSlotViewProps = {
  states: {
    loading: false,
    formState: {
      docusignSlot: (
        <div
          style={{
            border: "1px dashed black",
            width: "600px",
            height: "600px",
          }}
        ></div>
      ),
      completedTaxForm: true,
    },
  },
  callbacks: {
    onChange: (e) => console.log(e),
  },
  text: {},
};

export const RegisteredInOtherRegion = () => {
  return <IndirectDetailsSlotView {...registeredInOtherRegion} />;
};

export const RegisteredInCanada = () => {
  return <IndirectDetailsSlotView {...registeredInCanada} />;
};

export const TaxFormSelection = () => {
  return <TaxFormSelectionSlotView {...taxFormSelectionProps} />;
};

export const DocusignWrapper = () => {
  return <DocusignWrapperSlotView {...docusignWrapperProps} />;
};
