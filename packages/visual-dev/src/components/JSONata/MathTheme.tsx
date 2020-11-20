import React from "react";
import styled from "styled-components";
import { serializer } from "jsonata-ui-core";
import {
  AST, NodeEditorProps, Theme,
  VariableEditorProps,
  PathEditorProps,
  BlockEditorProps,
  FunctionEditorProps,
  MathEditorProps
} from "jsonata-visual-editor";

const MathBadge = styled.span`
  font-size: 100%;
  display: inline-block;
  font-weight: bold;
  white-space: nowrap;
  vertical-align: baseline;
  line-height:19px;
`;

function DefaultEditor(props: NodeEditorProps<AST>) {
  const serialized = serializer(props.ast);
  return <span>{serialized}</span>;
}

function VariableEditor(props: VariableEditorProps) {
  const serialized = serializer(props.ast);
  return <MathBadge>{serialized}</MathBadge>;
}

function PathEditor(props: PathEditorProps) {
  const serialized = serializer(props.ast);
  return <MathBadge>{serialized}</MathBadge>;
}

function BlockEditor(props: BlockEditorProps) {
  return (
    <>
      <span style={{ marginRight: 0 }}>(</span>
      {props.children}
      <span style={{ marginLeft: 0 }}>)</span>
    </>
  );
}

function FunctionEditor(props: FunctionEditorProps) {
  return (
    <>
      <span style={{ fontFamily: "monospace" }}>
        ${props.ast.procedure.value}
      </span>
      (<span>{props.args}</span>)
    </>
  );
}

function MathEditor(props: MathEditorProps) {
  return (
    <>
      {props.children.map(part => {
        if (part.type === "ast") {
          return part.editor;
        } else if (part.type === "operator") {
          return (
            <span>
              <b>{part.operator === "*" ? "x" : part.operator}</b>
            </span>
          );
        }
        return <span></span>
      })}
    </>
  );
}

export const MathTheme = {
  /*
    Base editors
  */
  Base: props => props.editor,
  RootNodeEditor: props => props.editor,
  IDETextarea: () => <div />,

  /*
    Compound editors
  */
  ComparisonEditor: DefaultEditor,
  CombinerEditor: DefaultEditor,
  BlockEditor,
  ConditionEditor: DefaultEditor,
  ObjectUnaryEditor: DefaultEditor,
  ArrayUnaryEditor: DefaultEditor,
  ApplyEditor: DefaultEditor,
  FunctionEditor,

  /*
    Leaf editors
   */
  BindEditor: DefaultEditor,
  VariableEditor,
  LeafValueEditor: DefaultEditor,
  PathEditor,

  /*
    Math editors
  */
  MathEditor
} as Theme;