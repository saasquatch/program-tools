import { h } from "@stencil/core";

export const LeftArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginBottom: "-2px", marginRight: "5px" }}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.34655 1.90573C7.75405 2.31323 7.75405 2.97392 7.34655 3.38143L3.56266 7.16531H14.9565C15.5328 7.16531 16 7.6325 16 8.20879C16 8.78509 15.5328 9.25227 14.9565 9.25227H3.56266L7.69437 13.384C8.10188 13.7915 8.10188 14.4522 7.69437 14.8597C7.28687 15.2672 6.62617 15.2672 6.21867 14.8597L0.305628 8.94664C-0.101876 8.53914 -0.101876 7.87845 0.305628 7.47094L5.87084 1.90573C6.27835 1.49822 6.93904 1.49822 7.34655 1.90573Z"
      fill="#858585"
    />
  </svg>
);

export const ExchangeArrows = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
  >
    <g filter="url(#filter0_d_428_4515)">
      <circle cx="21" cy="21" r="15" fill="white" />
    </g>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.6255 27.783C16.5129 27.8963 16.3597 27.96 16.2 27.96C16.0402 27.96 15.887 27.8963 15.7744 27.783L11.8744 23.8597C11.6408 23.6247 11.6419 23.2448 11.877 23.0112C12.112 22.7775 12.4919 22.7787 12.7255 23.0137L15.6 25.9054V14.52C15.6 14.1886 15.8686 13.92 16.2 13.92C16.5313 13.92 16.8 14.1886 16.8 14.52V25.9054L19.6744 23.0137C19.908 22.7787 20.2879 22.7775 20.5229 23.0112C20.758 23.2448 20.7591 23.6247 20.5255 23.8597L16.6255 27.783ZM26.2255 14.0971C26.1129 13.9838 25.9597 13.9201 25.8 13.9201C25.6402 13.9201 25.487 13.9838 25.3744 14.0971L21.4744 18.0204C21.2408 18.2554 21.2419 18.6353 21.477 18.8689C21.712 19.1025 22.0919 19.1014 22.3255 18.8664L25.2 15.9747V27.3601C25.2 27.6914 25.4686 27.9601 25.8 27.9601C26.1313 27.9601 26.4 27.6914 26.4 27.3601V15.9747L29.2744 18.8664C29.508 19.1014 29.8879 19.1025 30.1229 18.8689C30.358 18.6353 30.3591 18.2554 30.1255 18.0204L26.2255 14.0971Z"
      fill="#333333"
    />
    <defs>
      <filter
        id="filter0_d_428_4515"
        x="0"
        y="0"
        width="42"
        height="42"
        filterUnits="userSpaceOnUse"
        //@ts-ignore
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.670833 0 0 0 0 0.670833 0 0 0 0 0.670833 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_428_4515"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_428_4515"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
