import { h } from "@stencil/core"
import { css } from "emotion"

interface ILoadingStateProps {
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    color?: string;
    lightColor?: string;
  }
  
  
  export const LoadingState = ({ minHeight, minWidth, maxWidth, color = "#ccc", lightColor = "#eee" }: ILoadingStateProps) => {
    const Wrapper = css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: ${`${minWidth}px` || "100%"};
      max-width: ${`${maxWidth}px` || "100%"};
      min-height: ${`${minHeight}px` || "100%"};
      right: 0;
      left: 0;
      position: absolute;
    `
  
    const LoadingCSS = css`
      position: relative;
      margin-top: 64px;
      margin: auto;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: ${color};
      color: ${color};
      animation: dotFlashing 1s infinite linear alternate;
      animation-delay: .5s;
  
      &::before, &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
      }
  
      &::before {
        left: -15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: ${color};
        color: #ccc;
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 0s;
      }
  
      &::after {
        left: 15px;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: ${color};
        color: ${color};
        animation: dotFlashing 1s infinite alternate;
        animation-delay: 1s;
      }
  
      @keyframes dotFlashing {
        0% {
          background-color: ${color};
        }
        50%,
        100% {
          background-color: ${lightColor};
        }
      }
    `
  
    return <div class={Wrapper}>
      <div class={LoadingCSS}></div>
    </div>
  }