import { useSelect } from "downshift";
import React from "react";
import { Select } from "./Select";
import root from "react-shadow/styled-components";
import styled from "styled-components";

export default {
  title: "Components / Select",
  component: Select,
};

export const Basic = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional };
  return (
    <div style={{ resize: "both", overflow: "auto", margin: "100px" }}>
      <Select {...props}></Select>
    </div>
  );
};

const ShadowDom = styled(root.div)`
  display: contents;
`;

const WorkingShadowInner = (environment: any) => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items, environment });
  const props = { items, functional };
  return <Select {...props}></Select>;
};

export const WorkingShadow = () => {
  const proxyenv = (environment : any) => createProxyEnvironment(environment);
  return (
    <div style={{ resize: "both", overflow: "auto", margin: "100px" }}>
      <ShadowDom>
        <WorkingShadowInner environment={proxyenv} />
      </ShadowDom>
    </div>
  );
};

export const Clearable = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, clearable: true };
  return <Select {...props}></Select>;
};

export const Detailed = () => {
  interface Islands {
    text: string;
    description: string;
  }
  const items = [
    { text: "Salt Spring", description: "The big one" },
    { text: "Gabriola", description: "Way up north" },
    { text: "Mayne", description: "With a y" },
    { text: "Pender", description: "There's actually two" },
  ];
  const itemToString = (item: Islands) => (item ? item.text : "");
  const functional = useSelect({ items, itemToString });
  const props = { items, functional, itemToString };
  return <Select {...props}></Select>;
};

export const Disabled = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, disabled: true };
  return <Select {...props}></Select>;
};

export const Error = () => {
  const items = ["Salt Spring", "Gabriola", "Mayne", "Pender"];
  const functional = useSelect({ items });
  const props = { items, functional, errors: { field1: "error" } };
  return <Select {...props}></Select>;
};
