export default (): ImpactConnection => {
  return {
    connected: true,
    taxHandlingEnabled: true,
    publisher: {
      requiredTaxDocumentType: "W9",
      currentTaxDocument: {
        dateCreated: 0,
        status: "NOT_VERIFIED",
        type: "W9",
      },
      withdrawalSettings: null,
      payoutsAccount: null,
    },
  };
};
