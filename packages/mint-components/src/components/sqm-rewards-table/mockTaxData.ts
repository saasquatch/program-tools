import { ImpactConnection } from "../../saasquatch";

export default (): ImpactConnection => {
  return {
    connected: true,
    taxHandlingEnabled: true,
    // publisher: null,
    publisher: {
      requiredTaxDocumentType: "W9",
      currentTaxDocument: null,
      // currentTaxDocument: {
      //   dateCreated: 0,
      //   status: "NOT_VERIFIED",
      //   type: "W9",
      // },
      withdrawalSettings: null,
      payoutsAccount: null,
    },
  };
};
