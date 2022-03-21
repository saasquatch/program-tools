import React from "react";
import styled from "styled-components";

type CopyWrapperProps = OptionProps &
  Omit<React.ComponentProps<"div">, "translate" | "css">;

export interface OptionProps {
  /**
   * Content to copy to clipboard on click
   */
  copyContent: string;
  /**
   * Callback passes the result of the copy action, either successful or failed (true/false)
   */
  copyCallback: (copyResult: boolean) => void;
}

const Container = styled.div`
  display: contents;
`;

export const CopyWrapper = React.forwardRef<
  React.ElementRef<"div">,
  CopyWrapperProps
>((props, forwardedRef) => {
  const { copyContent, copyCallback, children, ...rest } = props;

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
    <Container onClick={writeToClipboard} {...rest} ref={forwardedRef}>
      {children}
    </Container>
  );
});
