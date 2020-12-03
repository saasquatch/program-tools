import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Col,
  FormGroup
} from "react-bootstrap";
import styled from "styled-components";
import { ArrayUnaryNode, JsonataASTNode, LiteralNode, ObjectUnaryNode, PathNode, serializer } from "jsonata-ui-core";
import {
  CombinerEditorProps,
  Context,
  MathEditorProps,
  isMath,
  OnChange,
  ConditionEditorProps,
  IDETextareaProps,
} from "jsonata-visual-editor/dist/AstEditor";
import { AST, NodeEditorProps } from "jsonata-visual-editor";
import { MathTheme } from "./MathTheme";
import jsonata from "jsonata";
import JSONataUtils from "./JSONataUtils";
import { P } from "../Typography";

export type Callback = () => void;

export const InlineError = styled.div`
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
`;

export const StyledMathForm = styled.form`
  margin-bottom: 0px;
  display: inline-flex;
`;

export const TData = styled.td`
  white-space: nowrap;
  align-items: baseline;

  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 10px;
  padding-left: 0px;
  
  & .Select-control, & .Select {
    width: 100%;
  }

  & .error-container {
    width: 100%;

    & div,
    & input[type="text"] {
      width: 100%;
    }
  }

  & form {
    margin: 0 0 0 0;
    width: fit-content;

    & input[type="text"] {
      max-width: 100px;
      min-width: 160px;
    }
  }
`;

export const THead = styled.th`
  text-align: left;
  padding 0;
  color: #575757;
`;

export const TRow = styled.tr``;

export const JSONataTable = styled.table`
  max-width: 100%;
  table-layout: auto;
  margin-top: 6px;
`;

export const FormButton = styled.button`
  margin: 0;
  padding: 0;
  margin-top: 10px;

  align-self: flex-start;

  background: transparent;
  border: none;
  outline:none;
  color: #F5A841
  
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  text-decoration: none;
  font-size: 13px;
  
`;

export const TypeButton = styled.button`
  background: #ffffff;

  color: ${(props) => (props.className == `active` ? `#575757;` : `#999;`)};
  font-weight: ${(props) =>
    props.className == `active` ? `bold;` : `normal;`};

  outline: none;
  border: none;

  height: 30px;

  font-family: "Helvetica Neue", Helvetica, sans-serif;
  text-decoration: none;
  font-size: 13px;
  text-align: center;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TBody = styled.tbody``;

const ButtonContainer = styled.div`
  height: 30px;
  width: 126px;
  margin-left: -6px;
`;

const ButtonMap = {
  number: "Number",
  string: "String",
  path: "Variable",
  value: "Boolean",
};

export function TypeSwitch({
  ast,
  changeType,
}: NodeEditorProps<LiteralNode | PathNode> & { changeType: Callback }) {
  const [dataType, setDataType] = useState("String");

  useEffect(() => {
    if (ButtonMap[ast.type] != undefined) {
      if (ButtonMap[ast.type] != "Variable") {
        setDataType(ButtonMap[ast.type]);
      }
    } else {
      setDataType("Math");
    }
  });

  return (
    <ButtonContainer>
      <TypeButton
        className={ButtonMap[ast.type] == "Variable" ? "active" : "inactive"}
        onClick={changeType}
        style={{width:"62px"}}
      >
        Variable
      </TypeButton>
      <TypeButton
        className={ButtonMap[ast.type] != "Variable" ? "active" : "inactive"}
        onClick={changeType}
        style={{width:"64px"}}
      >
        {dataType}
      </TypeButton>
    </ButtonContainer>
  );
}

function MathEditor({
  children,
  text,
  parsing,
  ast,
  changeType,
  onChange,
}: MathEditorProps) {
  const context = Context.useContainer();
  const [isEditing, setIsEditing] = useState(false);
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

  console.log('ast', ast);
  console.log('chang type', changeType);

  if (isEditing) {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
       
        {/* <TypeSwitch ast={ast} onChange={onChange} changeType={changeType} /> */}
        <Form style={{ marginBottom: "0px", alignItems: "center" }}>
          <input
            ref={inputRef as React.RefObject<any>}
            type="text"
            placeholder="Enter a math expression"
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onChange={(e) => setInput(e.target.value)}
          />
          <p style={{marginBottom:"0px"}}>{parsing.error}</p>
        </Form>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* <TypeSwitch ast={ast} onChange={onChange} changeType={changeType} /> */}
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
        </StyledMathForm>
      </div>
    );
  }
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
                    <AndFlag style={{ top: "1px", borderRadius: "5px" }}>
                      AND
                    </AndFlag>
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
                  minHeight: "30px",
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

export function defaultPath(): PathNode {
  return {
    type: "path",
    steps: [
      {
        type: "name",
        value: "select",
        position: 0,
      },
    ],
    position: 0,
    value: undefined,
  };
}

export function nextAst(ast: AST, defaultPath: AST): AST {
  if (ast.type === "string") {
    try {
      const testAst = jsonata(ast.value as string).ast() as AST;
      if (isMath(testAst)) {
        return testAst;
      }
    } catch (e) {}
  }

  if (ast.type !== "path") {
    // @ts-ignore
    if (ast.value && !isNaN(ast.value)) {
      try {
        return jsonata(ast.value as string).ast() as AST;
      } catch (e) {
        return defaultPath;
      }
    } else {
      // Numbers aren't valid paths, so we can't just switch to them
      return defaultPath;
    }
  } else if (ast.type === "path") {
    return { type: "string", value: serializer(ast), position: 0 } as AST;
  }
  throw new Error("Unhandled AST type");
}

export function addNewObject(
  ast: ObjectUnaryNode,
  onChange: OnChange<JsonataASTNode>
) {
  const newExpression = [
    {
      value: "",
      type: "string",
    },
    {
      value: "",
      type: "string",
    },
  ];
  onChange({
    ...ast,
    lhs: [...ast.lhs, newExpression],
  } as ObjectUnaryNode);
}

export function addNewArray(
  ast: ArrayUnaryNode,
  onChange: OnChange<JsonataASTNode>
) {
  const newExpression = {
    value: "",
    type: "string",
  };
  onChange({
    ...ast,
    expressions: [...ast.expressions, newExpression],
  } as ArrayUnaryNode);
}

export function getButton(
  pair: any,
  elseEditor: ConditionEditorProps["elseEditor"],
  children: ConditionEditorProps["children"],
  canDelete: boolean
) {
  const hideRemoveButton = !canDelete;
  return hideRemoveButton ? (
    <></>
  ) : (
    <FormButton
      style={{ paddingTop: "6px" }}
      onClick={(e) => {
        e.preventDefault();
        JSONataUtils.removeRule(pair, children, elseEditor);
        pair.remove();
      }}
    >
      <i className="icon-sqh-close" />
    </FormButton>
  );
}

export function updateOperator(
  value: string,
  changeOperator: any,
  operators: Array<string>,
  op: string
) {
  if (!operators.includes(value)) changeOperator(op);
}

export function InitialDataIDETextarea(props: IDETextareaProps) {
  return (
    <div>
      <P>
        Use JSONata to configure the mapping of initial values to form fields.
        Visit the <a href="https://jsonata.org/">JSONata website</a> to learn
        more.
      </P>
      <textarea
        style={{ maxWidth: "96.9%", minHeight: "100px" }}
        className="form-control"
        value={props.text}
        onChange={(e) => props.textChange(e.target.value)}
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

export function DisplayRulesIDETextarea(props: IDETextareaProps) {
  return (
    <div>
      <P>
        Use JSONata to configure your form protection rules. Visit the{" "}
        <a href="https://jsonata.org/">JSONata website</a> to learn more.
      </P>
      <textarea
        style={{ maxWidth: "96.9%", minHeight: "100px" }}
        className="form-control"
        value={props.text}
        onChange={(e) => props.textChange(e.target.value)}
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

export const Math = styled.div`
  * {
    margin-left: 2px;
    margin-right: 2px;
  }

  *:first-child {
    margin-left: 0;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
  cursor: pointer;
  line-height: 1;
  background: #ebedf0;
  border-radius: 3px;
  padding: 3px 10px;
  border: 1px solid #ebecf2;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.12);

  :hover {
    background: #cfd0d3;
    border-color: rgba(0, 0, 0, 0.12);
  }
`;

export const FormEditorTheme = {
  /*
    Base editors
  */

  /*
    Compound editors
  */
  CombinerEditor,

  /*
    Leaf editors
   */
  MathEditor,
};
