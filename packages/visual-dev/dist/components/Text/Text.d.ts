import * as Styles from "./Styles";
declare type TextSizeVariants = keyof typeof Styles.sizeVariants;
export declare type TextProps = {
    /**
     * Text size given by a value of 1 (largest) to 5 (smallest)
     */
    size?: TextSizeVariants;
    /**
     * Set the text to boldface
     */
    bold?: boolean;
    /**
     * Set the text color, must be a valid CSS color
     */
    color?: string;
    /**
     * Text to display
     */
    children: string;
};
export declare const Text: import("styled-components").StyledComponent<"span", any, Pick<TextProps, "color" | "size" | "bold">, never>;
export {};
