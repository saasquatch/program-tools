import { h, FunctionalComponent } from "@stencil/core";

export const ResizerStylesheet = `
.resizer{
    resize: horizontal;
    border: 2px dashed gray;
    padding: 10px;
    height: fit-content;
    overflow: hidden;
}

.resizer:hover{
    background-image: linear-gradient(
        45deg, lightgrey 25%, transparent 25%), linear-gradient(
        -45deg, lightgrey 25%, transparent 25%), linear-gradient(
        45deg, transparent 75%, lightgrey 75%), linear-gradient(
        -45deg, transparent 75%, lightgrey 75%); 
    background-size: 20px 20px;
    background-position: 0px 0px, 0px 10px, 10px -10px, -10px 0px;
}
`;

export const Resizer: FunctionalComponent = (_, children) => (
  <div class="resizer">{children}</div>
);
