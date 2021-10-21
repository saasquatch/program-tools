// Legacy Animations

import React from 'react'
import styled, { keyframes } from 'styled-components'

export const ButtonDiv = styled.div`
  text-align: center;
  padding: 6px 0;
`

export const CheckMark = styled.svg`
  overflow: unset;
  display: inline-block;
  position: relative;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  margin: -1px;
  margin-left: 2px;
  margin-right: 2px;

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
`

const rotate = keyframes`
   from {      
     transform: rotate(0deg);    
    }    
    to {      
      transform: rotate(360deg);    
    }
`

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
`

export const ButtonSpinnerStyle = styled(RingDefault)`
  position: relative;
  bottom: 12px;
  margin-left: 5px;
  margin-right: 13px;
  div {
    width: 15px;
    height: 15px;
    border: 2px solid #f5a623;
    border-color: #f5a623 transparent transparent transparent;
  }
`

export const ButtonSpinner = (
  <ButtonSpinnerStyle>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </ButtonSpinnerStyle>
)

export const successAnimation = (
  <CheckMark version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130.2 130.2'>
    <circle className='path circle' fill='none' stroke='#FFF' stroke-width='14' stroke-miterlimit='10' cx='65.1' cy='65.1' r='62.1' />
    <polyline className='path check' fill='none' stroke='#FFF' stroke-width='14' stroke-linecap='round' stroke-miterlimit='10' points='100.2,40.2 51.5,88.8 29.8,67.5 ' />
  </CheckMark>
)
