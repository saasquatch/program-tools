import React from "react";
import styled from "styled-components";

type CopyWrapperProps = OptionProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  displayType?: string;
  clipboardContent: string;
}

const Container = styled.div<{ displayType: string }>`
  display: ${({ displayType }) => displayType};
`;

export const CopyWrapper = React.forwardRef<
  React.ElementRef<"div">,
  CopyWrapperProps
>((props, forwardedRef) => {
  const { displayType = "block", clipboardContent, children, ...rest } = props;

  const writeToClipboard = () => {
    navigator.clipboard.writeText(clipboardContent).then(
      function () {
        /* clipboard successfully set */
      },
      function () {
        /* clipboard write failed */
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
