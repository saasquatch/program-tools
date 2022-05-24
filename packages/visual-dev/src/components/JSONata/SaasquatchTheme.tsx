import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Col,
  Button,
  Table,
  FormControl,
  FormGroup,
} from "react-bootstrap";
import styled from "styled-components";
import PathPicker from "./PathEditor";
import { LiteralNode } from "jsonata-ui-core";
import {
  IDETextareaProps,
  CombinerEditorProps,
  PathEditorProps,
  BindEditorProps,
  FunctionEditorProps,
  ApplyEditorProps,
  BlockEditorProps,
  ObjectUnaryEditorProps,
  VariableEditorProps,
  ArrayUnaryEditorProps,
  BaseEditorProps,
  RootNodeEditorProps,
  Context,
  MathEditorProps,
} from "jsonata-visual-editor/dist/AstEditor";
import { Modes, AST, NodeEditorProps } from "jsonata-visual-editor";
import { TextLink } from "../TextButton";
import { P } from "../Typography";
import { MathTheme } from "./MathTheme";
import jsonata from "jsonata";

type Callback = () => void;
type OnChange<T> = (val: T) => void;

const InlineError = styled.div`
  color: red;
`;

const AndFlag = styled.div`
  position: absolute;
  top: 13px;
  left: -43px;
  background-color: #65bd60;
  padding: 2px 4px;
  font-size: 13px;
  line-height: 25px;
  color: #ffffff;
  border-radius: 3px;
`;

const StyledMathForm = styled.form`
  margin-bottom: 0px;
`;

function IDETextarea(props: IDETextareaProps) {
  return (
    <div>
      <textarea
        style={{ maxWidth: "96.9%", minHeight: "100px" }}
        className="form-control"
        value={props.text}
        onChange={(e) => /** @ts-ignore */ props.textChange(e.target.value)}
      />
      <br />
      {props.parsing.inProgress ? (
        "Parsing..."
      ) : (
        <InlineError>{props.parsing.error}</InlineError>
      )}
    </div>
  );
}

function CombinerEditor(props: CombinerEditorProps) {
  let count = 0;
  return (
    <>
      <FormGroup controlId="formControlsSelect" style={{ marginLeft: "45px" }}>
        <Col sm={10}>
          {props.children.map((child) => {
            if (count == 1) {
              return (
                <>
                  <div
                    style={{
                      marginBottom: "1em",
                      position: "relative",
                      top: "-4px",
                      textAlign: "center",
                    }}
                  />
                  <FormGroup
                    style={{
                      marginBottom: "0",
                      height: "30px",
                      display: "flex",
                      position: "relative",
                    }}
                    key={child.toString()}
                  >
                    <AndFlag style={{ top: "1px" }}>AND</AndFlag>
                    <div
                      style={{
                        marginBottom: "1em",
                        position: "relative",
                        top: "-4px",
                        textAlign: "center",
                      }}
                    />
                    {child}
                  </FormGroup>
                </>
              );
            }
            count++;
            return (
              <FormGroup
                style={{
                  display: "flex",
                  marginBottom: "0",
                  height: "30px",
                }}
                // key={child}
              >
                {child}
              </FormGroup>
            );
          })}
        </Col>
      </FormGroup>
    </>
  );
}

function BlockEditor({ children }: BlockEditorProps) {
  return <>{children}</>;
}

function ObjectUnaryEditor({
  children,
  addNew,
  removeLast,
}: ObjectUnaryEditorProps) {
  const canDelete = children.length > 1;
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {children.map((c) => {
            return (
              <tr>
                <td>{c.key}</td>
                <td>{c.value}</td>
                <td>
                  <Button onClick={c.remove} disabled={!canDelete}>
                    X
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddRemoveGroup addNew={addNew} removeLast={removeLast} />
    </>
  );
}

type AddRemoveGroupProps = {
  addNew: Callback;
  removeLast: Callback;
  canDelete?: boolean;
};
function AddRemoveGroup({
  addNew,
  removeLast,
  canDelete = true,
}: AddRemoveGroupProps) {
  return (
    <>
      <Button onClick={addNew}>Add</Button>
      <Button onClick={removeLast} disabled={!canDelete}>
        x Remove Last
      </Button>
    </>
  );
}

function VariableEditor({
  ast,
  onChange,
  boundVariables,
}: VariableEditorProps) {
  return (
    <FormControl
      // componentClass={"select"}
      placeholder="select"
      value={ast.value}
      onChange={(e) => {
        // @ts-ignore
        const newValue = { ...ast, value: e.target.value };
        onChange(newValue);
      }}
    >
      {boundVariables.map((k) => (
        <option key={k} value={k}>
          {k}
        </option>
      ))}
    </FormControl>
  );
}

function ArrayUnaryEditor({
  children,
  addNew,
  removeLast,
}: ArrayUnaryEditorProps) {
  const canDelete = children.length > 1;
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Value</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {children.map((c) => {
            return (
              <tr>
                <td>{c.editor}</td>
                <td>
                  <Button onClick={c.remove} disabled={!canDelete}>
                    X
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddRemoveGroup addNew={addNew} removeLast={removeLast} />
    </>
  );
}

function LeafValueEditor({
  onChangeText,
  text,
}: NodeEditorProps<LiteralNode> & {
  text: string;
  onChangeText: OnChange<string>;
}) {
  const [input, setInput] = useState(text || "");
  return (
    <input
      style={{ maxWidth: "134px" }}
      type="text"
      placeholder="Enter a value"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onBlur={() => onChangeText(input)}
    />
  );
}

function PathEditor({ ast, onChange, schemaProvider }: PathEditorProps) {
  return (
    <>
      <PathPicker
        value={ast}
        onChange={(option) => onChange(option.value as AST)}
        schemaProvider={schemaProvider}
        // schema={schema}
      />
      <FormControl.Feedback type="invalid">
        {/* {parsing.error} */}
      </FormControl.Feedback>
    </>
  );
}

function Base({ toggleMode, toggleBlock, mode, editor }: BaseEditorProps) {
  return (
    <>
      {editor}
      <div style={{ textAlign: "right" }}>
        <TextLink
          disabled={toggleBlock ? true : false}
          //@ts-ignore
          onClick={(e) => {
            e.preventDefault();
            toggleMode();
          }}
        >
          Switch to {mode === Modes.NodeMode ? "Advanced" : "Basic"}
        </TextLink>
        <P>{toggleBlock}</P>
      </div>
    </>
  );
}

function RootNodeEditor({ editor }: RootNodeEditorProps) {
  return editor;
}

function ApplyEditor({ lhs, children, ast }: ApplyEditorProps) {
  console.log('ast ', ast)
  if (children.length === 1) {
    // Single apply, similar to binarynode
    return (
      <>
        <tr>
          {lhs}
          {children[0]}
        </tr>
      </>
    );
  }
  return (
    <>
      <tr>
        {lhs}
        <Table>
          <tr>
            {children.map((c) => (
              <>
                <td>{"~>"}</td>
                <td>{c}</td>
              </>
            ))}
          </tr>
        </Table>
      </tr>
    </>
  );
}

function FunctionEditor({
  args,
  ast,
  changeProcedure,
}: FunctionEditorProps): JSX.Element {
  const picker = (
    <FormControl
      as="select"
      value={ast.procedure.value}
      onChange={(e: any) => changeProcedure(e.target.value)}
    >
      <option value="contains">$contains</option>
    </FormControl>
  );
  if (args.length === 1) {
    return (
      <>
        {picker}
        {args[0]}
      </>
    );
  }

  return (
    <>
      <tr>
        {picker}
        {args}
      </tr>
    </>
  );
}

function BindEditor({ lhs, rhs }: BindEditorProps) {
  return (
    <>
      <Form>
        {lhs}
        <Col>set value to:</Col>
        {rhs}
      </Form>
    </>
  );
}

const Math = styled.div`
  * {
    margin-left: 2px;
    margin-right: 2px;
  }

  *:first-child {
    margin-left: 0;
  }

  user-select: none;
  cursor: pointer;
  line-height: 1;
  background: #ebedf0;
  border-radius: 3px;
  padding: 3px 10px;
  border: 1px solid #ebecf2;
  border-bottom-color: #c7c7d4;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.12);

  :hover {
    background: #cfd0d3;
    border-color: rgba(0, 0, 0, 0.12);
  }
`;

function MathEditor({
  children,
  text,
  textChange,
  parsing,
  ast,
  changeType,
  onChange,
  cols = "5",
}: MathEditorProps) {
  console.log(textChange, ast, changeType, cols);
  const context = Context.useContainer();
  const [isEditing, setIsEditing] = useState(false);
  // const originalText = useRef(text);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState(text || "");
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (parsing.error) {
      e.preventDefault();
    }
    //@ts-ignore
    onChange(jsonata(input).ast());
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && parsing.error) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter" || e.key === "Escape") {
      e.currentTarget.blur();
    }
  }

  if (isEditing) {
    return (
      <Form style={{ marginBottom: "0px", alignItems: "center" }}>
        <input
          ref={inputRef as React.RefObject<any>}
          type="text"
          style={{ marginTop: "10px" }}
          placeholder="Enter a math expression"
          value={input}
          // onChange={e => {e.preventDefault(), textChange(e.target.value)}}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          // isInvalid={!!parsing.error}
          onChange={(e) => setInput(e.target.value)}
          // onBlur={handleBlur(e)}
        />
        <p>{parsing.error}</p>
      </Form>
    );
  } else {
    return (
      <StyledMathForm>
        <Math onClick={() => setIsEditing(true)}>
          <Context.Provider
            initialState={{
              ...context,
              theme: MathTheme,
            }}
          >
            {children.map((part) => {
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
          </Context.Provider>
        </Math>
        {/* <TypeSwitch ast={ast} onChange={onChange} changeType={changeType} /> */}
      </StyledMathForm>
    );
  }
}

export const SaasquatchTheme = {
  /*
    Base editors
  */
  Base,
  RootNodeEditor,
  IDETextarea,

  /*
    Compound editors
  */
  CombinerEditor,
  BlockEditor,
  ObjectUnaryEditor,
  ArrayUnaryEditor,
  ApplyEditor,
  FunctionEditor,

  /*
    Leaf editors
   */
  BindEditor,
  VariableEditor,
  LeafValueEditor,
  PathEditor,
  MathEditor,
};
