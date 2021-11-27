import { h } from "@stencil/core";

export const checkmark_circle = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M1.636 9a7.364 7.364 0 1114.728 0A7.364 7.364 0 011.636 9zM9 0a9 9 0 100 18A9 9 0 009 0zm5.192 6.266a.982.982 0 00-1.548-1.208l-4.787 6.137-2.58-2.58a.982.982 0 00-1.39 1.388l3.367 3.366a.982.982 0 001.468-.09l5.47-7.013z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export const arrow_left_right = () => {
  return (
    <svg width={11} height={12} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.265 2.789a.346.346 0 000-.489L8.066.101a.346.346 0 10-.489.489l1.61 1.609H2.073a.691.691 0 00-.69.691v1.728a.346.346 0 00.69 0V2.89h7.114L7.577 4.5a.346.346 0 10.49.488l2.198-2.2zM.101 9.21a.346.346 0 000 .489l2.2 2.199a.346.346 0 00.488-.489l-1.61-1.609h7.114c.382 0 .691-.31.691-.691V7.382a.346.346 0 00-.691 0V9.11H1.18L2.789 7.5a.346.346 0 10-.489-.488l-2.199 2.2z"
        fill="currentColor"
      />
    </svg>
  );
};
