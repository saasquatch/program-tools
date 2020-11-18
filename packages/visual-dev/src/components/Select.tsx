import * as React from "react";
import { ArrowRenderer } from "./StyledSelect";
import DefaultSelect from "react-select";
import { SelectComponentsProps } from "react-select/src/Select";


const Select = (props: SelectComponentsProps) => (
  <DefaultSelect arrowRenderer={ArrowRenderer} {...props} />
);

export default Select;
