import React from "react";
export declare type HoverPopoverProps = {
    handle: React.ReactNode;
} & Omit<React.ComponentProps<"div">, "translate" | "css">;
export declare const HoverPopover: React.FC<HoverPopoverProps>;
