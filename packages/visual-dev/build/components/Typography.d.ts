/// <reference types="react" />
interface Props {
    color?: string;
}
export declare const H1: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & Props, any, import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & Props>;
declare type MarginBottom = "8px";
interface H2Props {
    marginBottom?: MarginBottom;
}
export declare const H2: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & H2Props, any, import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & H2Props>;
export declare const BoldH2: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & H2Props, any, import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & H2Props>;
declare type Display = "inline";
interface H3Props {
    display?: Display;
}
export declare const H3: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & H3Props, any, import("react").ClassAttributes<HTMLHeadingElement> & import("react").HTMLAttributes<HTMLHeadingElement> & H3Props>;
export declare const P: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLParagraphElement> & import("react").HTMLAttributes<HTMLParagraphElement> & {
    bold?: boolean | undefined;
}, any, import("react").ClassAttributes<HTMLParagraphElement> & import("react").HTMLAttributes<HTMLParagraphElement> & {
    bold?: boolean | undefined;
}>;
export declare const NumberedStep: import("styled-components").StyledComponentClass<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export {};
