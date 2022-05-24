import React from 'react';
import { CSSProp } from 'styled-components';
import * as Styles from './Styles';
declare type HeadingSizeVariants = {
    size?: keyof typeof Styles.sizeVariants;
};
export declare type HeadingProps = HeadingSizeVariants & {
    as?: any;
    customCSS?: CSSProp;
};
export declare const Heading: React.FC<React.PropsWithChildren<HeadingProps>>;
export {};
