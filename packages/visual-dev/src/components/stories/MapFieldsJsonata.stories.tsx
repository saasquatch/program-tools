import { storiesOf } from "@storybook/react";
import React from "react";
import { createContainer } from "unstated-next";
import { JSONataEditorView } from "../MapFieldsJsonata";

const emptyState = {
  states: {
    showButton: true,
    emptyBlock: true,
    disableRemove: false,
    loading: false,
    defaultValue: "",
  },
  data: {
    value: "",
    inputDataSchema: {},
    SchemaContext: {},
  },
};



interface InitialStateProps {
  states?:any;
  data?:any;
  callbacks?:any;
}


const defaultState = (initialState: InitialStateProps = {}) => {
  const handleChange = () => {
    console.log("change");
  };

  const SchemaContext = createContainer((value) => value);

  return {
    states: {
      showButton: false,
      emptyBlock: false,
      disableRemove: false,
      loading: false,
      defaultValue: "",
      ...initialState.states
    },
    data: {
      value: "{ 'test' : 'test2' }",
      inputDataSchema: {},
      SchemaContext,
      ...initialState.data
    },
    callbacks: { onChange: handleChange },
  };
};

storiesOf("UI Schema Widgets / JSONata Editor Prefilled Fields", module).add(
  "Empty",
  () => {
    return (
      <div style={{ margin: "100px" }}>
        <JSONataEditorView {...defaultState(emptyState)} />
      </div>
    );
  }
);

storiesOf("UI Schema Widgets / JSONata Editor Prefilled Fields", module).add(
  "Single Rule",
  () => {
    return (
      <div style={{ margin: "100px" }}>
        <JSONataEditorView {...defaultState()} />
      </div>
    );
  }
);