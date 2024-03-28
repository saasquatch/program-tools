// @ts-nocheck
import { h } from "@stencil/core";
import { indirectDetailsSlotText } from "../defaultTextCopy";
import { DocusignExpiredView } from "./DocusignExpiredView";
import {
  IndirectDetailsSlotViewProps,
  OtherRegionSlotView,
} from "./IndirectTaxDetailsView";

export default {
  title: "Components/Tax Form Slot Views",
};

const registeredInOtherRegion: IndirectDetailsSlotViewProps = {
  states: {
    loading: false,
    hide: false,
    formState: {
      selectedRegion: "United Kindom",
      vatNumber: 12345,
      countryCode: "UK",
    },
  },
  data: {
    countries: [{ countryCode: "CA", displayName: "Canada" }],
  },
  text: indirectDetailsSlotText,
};

const registeredInCanada: IndirectDetailsSlotViewProps = {
  states: {
    loading: false,
    hide: false,
    formState: {
      province: "British Columbia",
      indirectTaxNumber: 1234,
    },
  },
  data: {
    countries: [{ countryCode: "CA", displayName: "Canada" }],
  },
  text: indirectDetailsSlotText,
};

export const RegisteredInOtherRegion = () => {
  return <OtherRegionSlotView {...registeredInOtherRegion} />;
};

export const RegisteredInCanada = () => {
  return <IndirectDetailsSlotView {...registeredInCanada} />;
};

export const RegisteredInOtherRegionWithErrors = () => {
  return (
    <OtherRegionSlotView
      {...registeredInOtherRegion}
      states={{
        ...registeredInOtherRegion.states,
        formState: {
          ...registeredInOtherRegion.states.formState,
          errors: {
            vatNumber: true,
            selectedRegion: true,
          },
        },
      }}
    />
  );
};

export const RegisteredInCanadaWithErrors = () => {
  return (
    <IndirectDetailsSlotView
      {...registeredInCanada}
      states={{
        ...registeredInCanada.states,
        formState: {
          ...registeredInCanada.states.formState,
          errors: {
            province: true,
            indirectTaxNumber: true,
          },
        },
      }}
    />
  );
};

export const DocusignExpired = () => {
  return <DocusignExpiredView />;
};
