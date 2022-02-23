import React from "react";
import { useState } from "react";

export type HoverPopoverProps = { handle: React.ReactNode } & Omit<
  React.ComponentProps<"div">,
  "translate" | "css"
>;

export const HoverPopover: React.FC<HoverPopoverProps> = ({
  handle,
  children,
}) => {
  const [show, setShow] = useState(false);

  return (
    <span
      onMouseOver={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
      style={{ position: "relative", display: "contents" }}
    >
      {handle}
      {show && children}
    </span>
  );
};
