// Source / https://loading.io/css/

import React from "react";
import styled, { CSSProp, css, keyframes } from "styled-components";

export interface RingProps {
  /**
   * Bottom offset
   */
  bottom?: string;
  /**
   * Right offset
   */
  right?: string;
  /**
   * Left offset
   */
  left?: string;
  /**
   * Right padding
   */
  paddingRight?: string;
  /**
   * Spinner colour
   */
  color?: string;
  /**
   * Spinner margin
   */
  margin?: string;
  /**
   * Additional custom CSS
   */
  customCSS?: CSSProp;
}

const rotate = keyframes`
   from {      
     transform: rotate(0deg);    
    }    
    to {      
      transform: rotate(360deg);    
    }
`;

const RingDefault = styled.div`
  display: inline-block;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    border-radius: 50%;
    animation: ${rotate} 1.7s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

// SMALL LOADING SPINNER FOR INSIDE OF BUTTONS while loading
const RingSmall = styled(RingDefault)<RingProps>`
  position: relative;
  bottom: ${(props) => props.bottom || `14px`};
  right: ${(props) => props.right || `2px`};
  left: ${(props) => props.left || `unset`};
  padding-right: ${(props) => props.paddingRight || `unset`};
  ${(props) => props.customCSS}
  div {
    width: 14px;
    height: 14px;
    margin: 3px;
    border: 2px solid ${(props) => props.color || `var(--sq-loading)`};
    border-color: ${(props) => props.color || `var(--sq-loading)`} transparent
      transparent transparent;
  }
`;

const SmallSpinner = ({ ...props }: RingProps) => {
  const { bottom, right, left, paddingRight, color, customCSS } = props;
  return (
    <RingSmall
      bottom={bottom}
      right={right}
      left={left}
      paddingRight={paddingRight}
      color={color}
      customCSS={customCSS}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </RingSmall>
  );
};

const UICLDotReset = css`
  uicl-loading-dots::part(animation){
    height: 88px;
    width: 88px;
  }

  uicl-loading-dots::part(base){
    margin-top:0;
    margin-left:0;
  }
`

const RingLargeStyleDiv = styled.div<RingProps>`
  margin: ${(props) => props.margin || "55px calc(50% - 25px)"};
  opacity: 0.5;
  bottom: ${(props) => props.bottom || `14px`};
  right: ${(props) => props.right || `2px`};
  left: ${(props) => props.left || `unset`};
  padding-right: ${(props) => props.paddingRight || `unset`};
  display: flex;
  align-items: center;
  justify-content: center;
  ${UICLDotReset}
`;


const LoadingSpinnerLarge = ({ ...props }: RingProps) => {
  const { bottom, right, left, paddingRight, color, customCSS } = props;
  return (
    <RingLargeStyleDiv
    bottom={bottom}
    right={right}
    left={left}
    paddingRight={paddingRight}
    color={color}
    customCSS={customCSS}>
    <uicl-loading-dots
      x-offset="0"
      y-offset="0"
      position="static"
    />
      </RingLargeStyleDiv>
  );
};

// TODO: center this spinner based on the height of the parent container... you know, with magic.
const TableStyleDiv = styled.div<RingProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.5);
  z-index: 4;
  width: 100%;
  height: 100%;
  ${UICLDotReset}
`;

const TableSpinner = (props: RingProps) => {
  const { bottom, right, left, paddingRight, color, customCSS } = props;
  return (
    <TableStyleDiv       bottom={bottom}
    right={right}
    left={left}
    paddingRight={paddingRight}
    color={color}
    customCSS={customCSS}>
    <uicl-loading-dots

      x-offset="0"
      y-offset="0"
      position="static"
    />
      </TableStyleDiv>
  );
};

const TableInitialStyleDiv = styled.tr`
  background: transparent;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 4;
  height: 160px;
  ${UICLDotReset}
`;

const TableInitialLoad = () => {
  return (
    <TableInitialStyleDiv>
      <uicl-loading-dots
      x-offset="0"
      y-offset="0"
      position="static"
      />

    </TableInitialStyleDiv>
  );
};

export const LoadingSpinner = {
  Normal: SmallSpinner,
  Large: LoadingSpinnerLarge,
  TableInitial: TableInitialLoad,
  Table: TableSpinner,
};
