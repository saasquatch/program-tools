import React, { useEffect, useState } from "react";
import { CopyWrapperView } from ".";
import { Icon } from "../..";
import { Tooltip } from "../Tooltip";

export default {
  title: "Components / Copy Wrapper",
  component: CopyWrapperView,
};

export const AroundIcon = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <>
      <CopyWrapperView
        copyCallback={setCopySuccess}
        copyContent="This is test clipboard content"
      >
        <Icon icon="copy" color="var(--sq-action-primary)" />
      </CopyWrapperView>
      <br></br>
      <span>Copy success value: {copySuccess ? "true" : "false"}</span>
    </>
  );
};

export const WithTooltip = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    console.log("test");
    const timer = setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copySuccess]);

  return (
    <>
      <CopyWrapperView
        copyCallback={setCopySuccess}
        copyContent="This is test clipboard content"
      >
        <Tooltip
          showTooltip={copySuccess}
          text={`Copied successfully? ${copySuccess ? "true" : "false"}`}
          direction={"right"}
        >
          <Icon icon="copy" color="var(--sq-action-primary)" />
        </Tooltip>
      </CopyWrapperView>
      <br></br>
    </>
  );
};
