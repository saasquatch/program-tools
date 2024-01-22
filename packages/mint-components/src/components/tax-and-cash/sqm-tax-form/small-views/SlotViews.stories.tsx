import { h } from "@stencil/core";
import {
  IndirectDetailsSlotView,
  IndirectDetailsSlotViewProps,
} from "./IndirectTaxDetailsView";

export default {
  title: "Components/Slot Views",
};

const indirectDetailsProps: IndirectDetailsSlotViewProps = {
  states: {
    loading: false,
    formState: {
      selectedRegion: "United Kindom",
      vatNumber: 12345,
    },
  },
  callbacks: {
    onSubmit: (props: any) => console.log("Submit"),
    onChange: (e) => console.log("Submit"),
  },
  text: {
    selectedRegion: "Country / Region of Indirect Tax",
    vatNumber: "VAT number",
  },
};

export const IndirectDetailsSlot = () => {
  return <IndirectDetailsSlotView {...indirectDetailsProps} />;
};
