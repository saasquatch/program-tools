import * as React from "react";
import { CSSProperties } from "react";
declare type Margin = "0 16px";
declare type FontWeight = "400" | "500" | "600" | "700";
interface TLSProps {
    margin?: Margin;
    blue?: boolean;
    icon?: string;
    inline?: boolean;
    action?: boolean;
}
interface TLProps extends TLSProps {
    children: React.ReactNode;
    onClick: () => void;
    fontWeight?: FontWeight;
    top?: number;
    fontSize?: number;
    customStyle?: CSSProperties | undefined;
    disabled?: boolean;
    action?: boolean;
}
export declare const TextLinkStyle: import("styled-components").StyledComponentClass<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & TLSProps, any, React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & TLSProps>;
export declare const TextLink: ({ children, icon, margin, blue, onClick, fontWeight, top, inline, fontSize, customStyle, disabled, action, }: TLProps) => JSX.Element;
export {};
