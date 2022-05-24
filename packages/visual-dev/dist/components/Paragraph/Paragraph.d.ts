import React from 'react';
declare type ParagraphSizeVariants = "1" | "2";
export declare type ParagraphProps = {
    size?: ParagraphSizeVariants;
    bold?: boolean;
};
export declare const Paragraph: React.FC<React.PropsWithChildren<ParagraphProps>>;
export {};
