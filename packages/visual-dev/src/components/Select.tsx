// @ts-nocheck
import * as React from "react";
import ArrowRenderer from "./ArrowRenderer";
import { SelectComponentsProps } from "react-select/src/Select";
import DefaultSelect from "react-select";
import "react-select/dist/react-select.css";
import styled from "styled-components";

const NarrowWrapper = styled.div`
  .Select {
    height: 30px;
  }

  & .Select-multi-value-wrapper,
  & .Select-control {
    height: 26px;
  }

  & .Select-placeholder {
    line-height: 26px;
  }

  & .Select-input {
    height: 26px;
    & input {
      line-height: 16px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }

  & .Select--single > .Select-control .Select-value {
    line-height: 27px;
  }
  
  &. Select-value {
    line-height: 27px;
  }
`;

const StyleWrapper = styled.div`
  & .Select-menu {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-size: 13px;
  }

  & .Select-control {
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    color: ${(props) => props.color || `#575757`};
    font-size: 14px;

    border-radius: 5px;
    border: solid 2px #e2e2e2;
    outline: 0;

    transition-duration: 0.2s;

    &:hover {
      border-color: #c8d2d9;
    }
  }
`;

export const CreatableSelect = (props: SelectComponentsProps) => (
    <StyleWrapper>
      <DefaultSelect.Creatable arrowRenderer={ArrowRenderer} {...props} />
    </StyleWrapper>
);

export const Select = (props: SelectComponentsProps) => (
    <StyleWrapper>
      <DefaultSelect arrowRenderer={ArrowRenderer} {...props} />
    </StyleWrapper>
);

export const CreatableSelectNarrow = (props: SelectComponentsProps) => (
  <NarrowWrapper>
    <StyleWrapper>
      <DefaultSelect.Creatable arrowRenderer={ArrowRenderer} {...props} />
    </StyleWrapper>
  </NarrowWrapper>
);

export const SelectNarrow = (props: SelectComponentsProps) => (
  <NarrowWrapper>
    <StyleWrapper>
      <DefaultSelect arrowRenderer={ArrowRenderer} {...props} />
    </StyleWrapper>
  </NarrowWrapper>
);
