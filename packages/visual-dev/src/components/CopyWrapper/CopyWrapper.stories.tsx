import React, { useState } from "react";
import { CopyWrapper } from ".";
import { Icon } from "../..";

export default {
  title: "Components / Copy Wrapper",
  component: CopyWrapper,
};

export const AroundIcon = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <>
      <CopyWrapper
        copyCallback={setCopySuccess}
        copyContent="This is test clipboard content"
      >
        <Icon icon="copy" color="var(--sq-action-primary)" />
      </CopyWrapper>
      <br></br>
      <span>Copy success value: {copySuccess ? "true" : "false"}</span>
    </>
  );
};
