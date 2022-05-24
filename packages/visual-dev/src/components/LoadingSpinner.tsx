//@ts-check

// Source / https://loading.io/css/

import React from "react";
import styled, { keyframes } from "styled-components";

interface RingProps {
  bottom?: string;
  right?: string;
  left?: string;
  paddingRight?: string;
}

const rotate = keyframes`
   from {      
     transform: rotate(0deg);    
    }    
    to {      
      transform: rotate(360deg);    
    }
`;

export const RingDefault = styled.div`
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
  bottom: ${props =>
    props.bottom || `14px`};
  right: ${props =>
    props.right || `2px`};
  left: ${props =>
    props.left || `unset`};
  padding-right: ${props =>
      props.paddingRight || `unset`}
    div {
    width: 14px;
    height: 14px;
    margin: 3px;
    border: 2px solid #f5a623;
    border-color: #f5a623 transparent transparent transparent;
  }
`;

const LoadingSpinner = ({ ...props } : RingProps) => {
  const { bottom, right, left, paddingRight } = props;
  return (
    <RingSmall
      bottom={bottom}
      right={right}
      left={left}
      paddingRight={paddingRight}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </RingSmall>
  );
};

export default LoadingSpinner;

// LARGE SPINNER FOR METRICS CARD
export const RingLarge = styled(RingDefault)`
  margin: 55px calc(50% - 25px);
  opacity: 0.5;

  div {
    width: 55px;
    height: 55px;
    border: 6px solid #f5a623;
    border-color: #f5a623 transparent transparent transparent;
  }
`;

export const LoadingSpinnerLarge = () => {
  return (
    <RingLarge>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </RingLarge>
  );
};

// TODO: center this spinner based on the height of the parent container... you know, with magic.
export const TableSpinnerStyle = styled(RingDefault)`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  z-index: 4;

  div {
    width: 55px;
    height: 55px;
    border: 6px solid #f5a623;
    border-color: #f5a623 transparent transparent transparent;
  }
`;

export const TableSpinner = () => {
  return (
    <TableSpinnerStyle>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </TableSpinnerStyle>
  );
};

export const TableInitialSpinnerStyle = styled(RingDefault)`
  height: 160px;
  background: transparent;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 4;

  div {
    width: 55px;
    height: 55px;
    border: 6px solid #f5a623;
    border-color: #f5a623 transparent transparent transparent;
  }
`;

export const TableInitialLoad = () => {
  return (
    <tr style={{ height: "160px" }}>
      <TableInitialSpinnerStyle>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </TableInitialSpinnerStyle>
    </tr>
  );
};
