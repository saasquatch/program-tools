import { h, FunctionalComponent } from "@stencil/core";

export const ResizerStylesheet = `

:root{
    --checker-color-1: #ffffff00;
    --checker-color-2: #ffffff00;
    --checker-size: 7px;
    --checker-gradient: linear-gradient(45deg, var(--checker-color-1) 25%, transparent 25%, transparent 75%, var(--checker-color-1) 75%);
}
.resizer{
    resize: horizontal;
    border: 2px dashed gray;
	margin: -2px;
    padding: 12px;
    height: fit-content;
    overflow: hidden;
	width: 100%;
}

.resizer{
    background-color: var(--checker-color-2);
    background-image: var(--checker-gradient), var(--checker-gradient);
    background-position: 0 0, var(--checker-size) var(--checker-size);
    background-size: calc(var(--checker-size) * 2) calc(var(--checker-size) * 2);
}
`;

export const Resizer: FunctionalComponent = (_, children) => (
  <div class="resizer">{children}</div>
);
