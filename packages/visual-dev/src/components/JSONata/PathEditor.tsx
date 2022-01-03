import React from "react";
import jsonata from "jsonata";
import { JsonataASTNode, serializer, escapeString } from "jsonata-ui-core";
import styled from "styled-components";
import { defaultComponents } from "react-select/src/components";
import { SchemaProvider } from "jsonata-visual-editor/dist/Types";
import { Path as PathSuggestion } from "jsonata-visual-editor/dist/schema/PathSuggester";
// import { GreenFlag } from "../../uiLibrary/Notification";
import ArrowRenderer from "../ArrowRenderer";
import { CreatableSelectNarrow } from "../Select-old";

// TODO
const GreenFlag = styled.div``;

const StyledOption = styled.div`
  border: 1px solid #eee;
  background-color: #fff;
  padding: 8px 10px 15px;
  max-height: 150px;
  line-height: 19px;
  overflow: hidden;
  &:hover {
    background-color: #efefef;
  }
`;

type AST = JsonataASTNode;
type Option =
  | {
      type: "suggested";
      label: string;
      value: AST;
      data: PathSuggestion;
    }
  | {
      type: "created";
      label: string;
      value: AST;
    };

//@ts-ignore
type CustomOptionProps = React.ComponentProps<typeof defaultComponents.Option>;

function getLabel(path: any) {
  return path && path.split(".").join(" ➝ ");
}

const CustomOption = (props: CustomOptionProps) => {
  const option = props.option as Option;
  if (!option) return <div>Empty :(</div>;
  if (option.type === "created") {
    return (
      <StyledOption title={option.label} onClick={() => props.onSelect(option)}>
        <p style={{ marginBottom: "3px" }}>{option.label}</p>
        <GreenFlag>new</GreenFlag>
      </StyledOption>
    );
  } else if (option.type === "suggested") {
    const p = option.data;
    const { label } = option;
    const typeString =
      (p.isJsonataSequence ? " list<" : " ") +
      p.type +
      (p.isJsonataSequence ? ">" : "");
    return (
      <StyledOption title={option.label} onClick={() => props.onSelect(option)}>
        <span className="Select-value-label">
          <p style={{ marginBottom: "3px" }}>{label || getLabel(p.path)}</p>
          <code>{p.path || "unknown"}</code>
          <GreenFlag>{typeString || "unknown"}</GreenFlag>
        </span>
      </StyledOption>
    );
  } else {
    // For new items before they are created.
    const validPath = true;
    const { label, value } = option;

    return (
      <div>
        {validPath && (
          <StyledOption
            className="Select-value"
            title={label}
            onClick={() => props.onSelect(option)}
          >
            <span className="Select-value-label">
              Create new: <code>{value}</code>
            </span>
          </StyledOption>
        )}
        {!validPath && <div>Unmatchable</div>}
      </div>
    );
  }
};

type PathEditorProps = {
  onChange: (ast: Option) => void;
  value: AST;
  schemaProvider?: SchemaProvider;
  hideArrow?: boolean;
};

export function Reducer(acc: Option[], p: PathSuggestion): Option[] {
  const path = escapeString(p.path);
  const subOptions: Option[] = p.subPaths ? p.subPaths.reduce(Reducer, []) : [];
  return [
    ...acc,
    {
      type: "suggested",
      label: p.title || getLabel(p.path),
      value: jsonata(path).ast() as AST,
      data: p,
    },
    ...subOptions,
  ];
}

export default function PathEditor(props: PathEditorProps) {
  const options =
    props.schemaProvider && props.schemaProvider.getPaths({} as JsonataASTNode);
  if (!options) return <></>;
  const schemaOptions: Option[] = options.reduce(Reducer, []);

  const exactMatch = (inputValue: string) => {
    return schemaOptions.find((i: Option) => i.label === inputValue);
  };

  type InputProps = {
    value: string;
  };
  const handleCreate = (inputValue: InputProps) => {
    const newOption: Option = {
      type: "created",
      label: inputValue.value,
      value: jsonata(inputValue.value).ast() as AST,
    };
    schemaOptions.push(newOption);
    props.onChange(newOption);
  };
  const stringValue = serializer(props.value);
  const foundOption = exactMatch(stringValue);
  const option = foundOption
    ? foundOption
    : {
        label: stringValue,
        value: props.value,
      };

  return (
    <div>
      <CreatableSelectNarrow
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
        }}
        clearable={false}
        arrowRenderer={
          props?.hideArrow
            ? () => {
                return <></>;
              }
            : ArrowRenderer
        }
        onNewOptionClick={handleCreate}
        defaultOptions
        options={schemaOptions}
        loadingPlaceholder="loading..."
        value={option}
        onChange={props.onChange}
        optionComponent={CustomOption}
      />
    </div>
  );
}
