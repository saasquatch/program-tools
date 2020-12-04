import React, { SyntheticEvent, useState } from "react";
import styled, { keyframes } from "styled-components";

interface PBProps {
  padding?: string | false;
  buttonColor?: string | false;
  darkercolor?: string | false;
  disabledcolor?: string | false;
  children: any[] | string;
  onClick: any;
  loading?: boolean;
  disabled?: boolean;
}

export const ButtonDiv = styled.div`
  text-align: center;
  padding: 6px 0;
`;

export const CheckMark = styled.svg`
  overflow: unset;
  display: inline-block;
  height: auto;
  position: relative;
  top: 2px;
  left: 13px;
  width: 14px;
  margin: 0;
  padding: 0;

  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    &.circle {
      -webkit-animation: dash 0.9s ease-in-out;
      animation: dash 0.9s ease-in-out;
    }
    &.line {
      stroke-dashoffset: 1000;
      -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
      animation: dash 0.9s 0.35s ease-in-out forwards;
    }
    &.check {
      stroke-dashoffset: -100;
      -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
      animation: dash-check 0.9s 0.35s ease-in-out forwards;
    }
  }

  p {
    text-align: center;
    margin: 20px 0 60px;
    font-size: 1.25em;
    &.success {
      color: #73af55;
    }
    &.error {
      color: #d06079;
    }
  }

  @-webkit-keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @-webkit-keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }

  @keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }
`;

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

export const ButtonSpinnerStyle = styled(RingDefault)`
  position: relative;
  bottom: 12px;
  padding: 0px 10px;
  div {
    width: 15px;
    height: 15px;
    border: 2px solid #f5a623;
    border-color: #f5a623 transparent transparent transparent;
  }
`;

export const ButtonSpinner = () => {
  return (
    <ButtonSpinnerStyle>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </ButtonSpinnerStyle>
  );
};

export const PrimaryButton = ({
  children,
  onClick,
  padding,
  buttonColor,
  darkercolor,
  disabledcolor,
  loading,
  ...props
}: PBProps) => {
  return (
    <PrimaryButtonStyled
      {...props}
      padding={padding}
      buttonColor={buttonColor}
      darkercolor={darkercolor}
      disabledcolor={disabledcolor}
      onClick={onClick}
      disabled={loading || props.disabled}
    >
      {children}
      {loading && <ButtonSpinner />}
    </PrimaryButtonStyled>
  );
};

// TODO: make one Primary Button to rule them all!
const PrimaryButtonStyled = styled.button<PBProps>`
  border-radius: 20px;
  min-width: 100px;
  padding: ${(props) => props.padding || `3px 19px`};
  background: ${(props) => props.buttonColor || `#f5a841`};
  border: 1px solid ${(props) => props.buttonColor || `#f5a841`};
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    background: ${(props) => props.darkercolor || `#DC8F28`};
    border: 1px solid ${(props) => props.buttonColor || `#DC8F28`};
    color: #fff;
    text-decoration: none;
    outline: none;
  }
  :disabled {
    background: ${(props) => props.disabledcolor || `#E2E2E2`};
    border: 1px solid ${(props) => props.disabledcolor || `#E2E2E2`};
    pointer-events: none;
  }
  ${ButtonDiv} & {
    margin: 0 8px;
  }
`;



// Primary Button ends

interface IPrimaryButton extends PBProps {
  onClick: any;
  disabled?: boolean;
  success?: boolean;
  successText?: string;
  children: string;
  loading: boolean;
}

export const PrimaryButtonNew = (props: IPrimaryButton) => {
  const [justClicked, setJustClicked] = useState(false);

  const {
    onClick,
    disabled,
    success,
    buttonColor,
    darkercolor,
    disabledcolor,
    padding,
    successText,
    children,
    loading,
  } = props;

  const successfulClick = success && justClicked;

  // TODO: how do I check if the onClick is successful? (I guess the success result comes from the props.success)
  // TODO: build in a way to have the checkmark persist instead of going away.
  async function onClickTimer(e : SyntheticEvent) {
    try {
      await onClick(e);
      setJustClicked(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setJustClicked(false);
    } catch (e) {
      throw new Error(e);
    }
  }

  return (
    <PrimaryButton
      buttonColor={buttonColor || (successfulClick && `#57AC59`)}
      darkercolor={darkercolor || (successfulClick && `#57AC59`)}
      disabledcolor={disabledcolor}
      padding={padding || (successfulClick && `3px 30px 3px 19px`)}
      onClick={onClickTimer}
      disabled={disabled}
      loading={loading}
    >
      {(successfulClick && successText) || children}
      {successfulClick && (
        <CheckMark
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle
            className="path circle"
            fill="none"
            stroke="#FFF"
            stroke-width="14"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <polyline
            className="path check"
            fill="none"
            stroke="#FFF"
            stroke-width="14"
            stroke-linecap="round"
            stroke-miterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        </CheckMark>
      )}
    </PrimaryButton>
  );
};

export const PrimaryHeaderButton = styled(PrimaryButton)`
  float: right;
`;

export const SecondaryButton = styled.button`
  border-radius: 20px;
  font-size: 13px;
  padding: 3px 19px;
  background: white;
  border: 1px solid ${(props) => props.color || `#a6b9bd`};
  color: #575757;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.color || `#a6b9bd`};
    border: 1px solid ${(props) => props.color || `#a6b9bd`};
    color: #fff;
    text-decoration: none;
    outline: none;
  }
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #eee;
    color: #aaa;
  }
`;

export const SecondaryButtonDisappearing = styled(SecondaryButton)`
  margin: 1% 0;
  display: none;
  cursor: pointer;
`;

export const SecondaryButtonPending = styled(SecondaryButton)`
  pointer-events: none;
`;


export const PlatformSignInButton = styled.button<{bgcolor?: string, hoverBGColor?: string}>`
  padding: 10px;
  background-color: ${(props) => props.bgcolor || `#e2e2e2`};
  color: white;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  line-height: 13px;
  font-weight: 600;
  font-size: 13px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: ${(props) => props.hoverBGColor || `#888888`};
    cursor: pointer;
  }
`