import * as React from "react";
import ArrowRenderer from "./ArrowRenderer";
import DefaultSelect from "react-select";
import { SelectComponentsProps } from "react-select/src/Select";
import 'react-select/dist/react-select.css';


const Select = (props: SelectComponentsProps) => (
  <DefaultSelect arrowRenderer={ArrowRenderer} {...props} />
);

export default Select;
