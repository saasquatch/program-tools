import { css } from "styled-components";

export const SliderStyle = css`
  &[type="range"] {
    -webkit-appearance: none;
    background: transparent;
    width: 100%;
    border-color: transparent;
    border-width: 6px 0;
    height: 4px;
    color: transparent;
  }
  &[type="range"]::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: #13bba4;
    margin-top: -1px;
  }
  &[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  &[type="range"]:focus {
    outline: none;
  }

  &[type="range"]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--sq-text);
    cursor: pointer;
    margin-top: -4px;
  }
  &[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--sq-text);
    cursor: pointer;
    margin-top: -4px;
  }
  &[type="range"]::-ms-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: var(--sq-text);
    cursor: pointer;
    margin-top: -5px;
  }

  &[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: #e2e2e2;
    border-radius: 4px;
  }
  &[type="range"]::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: #e2e2e2;
    border-radius: 4px;
  }
  &[type="range"]::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: #e2e2e2;
    border-radius: 4px;
  }
`;
