import * as React from "react";
import { ButtonProps } from "../Button";
export declare type PopoverProps = PopoverOptions & Omit<React.ComponentProps<"div">, "translate" | "css">;
export interface PopoverOptions {
    /**
     * Choose if popover is rendered
     */
    show?: boolean;
    /**
     * Content displayed inside the popover
     */
    children: React.ReactNode;
    /**
     * X offset of the popover relative to the element it originates from
     */
    relativeX?: string;
    /**
     * Y offset of the popover relative to the element it originates from
     */
    relativeY?: string;
}
export interface SectionProps {
    /**
     * Content to display inside the popover section
     */
    children: React.ReactNode;
}
export interface ActionProps extends Omit<ButtonProps, "buttonType"> {
}
declare const PopoverNamespace: React.FC<PopoverProps> & {
    SectionView: React.FC<SectionProps>;
    ActionView: React.FC<ActionProps>;
};
/**
 * @deprecated use {@link ListView} instead
 */
declare const PopoverNamespaceDeprecated: React.FC<PopoverProps> & {
    Section: React.FC<SectionProps>;
    Action: React.FC<ActionProps>;
};
export { PopoverNamespace as PopoverView };
/**
 * @deprecated use {@link ListView} instead
 */
export { PopoverNamespaceDeprecated as Popover };
