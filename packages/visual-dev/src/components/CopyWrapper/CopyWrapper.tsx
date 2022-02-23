import React from "react";
import styled from "styled-components";

type CopyWrapperProps = OptionProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  displayType?: string;
  copyContent: string;
  copyCallback: (copyResult: boolean) => void;
}

const Container = styled.div<{ displayType: string }>`
  display: ${({ displayType }) => displayType};
`;

export const CopyWrapper = React.forwardRef<
  React.ElementRef<"div">,
  CopyWrapperProps
>((props, forwardedRef) => {
  const {
    displayType = "block",
    copyContent,
    copyCallback,
    children,
    ...rest
  } = props;

  const writeToClipboard = () => {
    navigator.clipboard.writeText(copyContent).then(
      function () {
        copyCallback(true);
      },
      function () {
        copyCallback(true);
      }
    );
  };

  return (
    <Container
      onClick={writeToClipboard}
      displayType={displayType}
      {...rest}
      ref={forwardedRef}
    >
      {children}
    </Container>
  );
});
