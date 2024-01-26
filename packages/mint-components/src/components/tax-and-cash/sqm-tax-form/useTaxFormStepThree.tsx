import { useState } from "@saasquatch/universal-hooks";

export const useTaxFormStepThree = () => {
  const [errors, setErrors] = useState({});
  const [documentType, setDocumentType] = useState(null);

  const onSubmit = (e) => {
    if (!documentType) return;
  };

  return {
    states: {
      documentType,
    },
    callbacks: {
      onSubmit,
      onChange: setDocumentType,
    },
  };
};
