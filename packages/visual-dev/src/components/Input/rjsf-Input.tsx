import { WidgetProps } from "@rjsf/core";
import React, { useState } from "react";
import { IconButton } from "../Button";
import { Input } from "./Input";

export function RJSFInput(props: WidgetProps) {
  const options = props.options;
  return (
    <Input
      {...options}
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      errors={props.rawErrors && !!props.rawErrors.length}
      required={props.required}
    />
  );
}

export function RJSFNumericalInput(props: WidgetProps) {
  const options = props.options;
  return (
    <Input
      {...options}
      value={props.value}
      type="number"
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      errors={props.rawErrors && !!props.rawErrors.length}
      required={props.required}
    />
  );
}

export function RJSFPasswordInput(props: WidgetProps) {
  const [type, setType] = useState("password");
  const options = props.options;
  return (
    <Input
      {...options}
      type={type}
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      errors={props.rawErrors && !!props.rawErrors.length}
      disabled={props.disabled}
      required={props.required}
      buttons={
        <IconButton
          icon="visibility"
          size="mini"
          icon_css="height: 20px; width: 20px"
          borderless={true}
          onClick={() => {
            setType(type == "text" ? "password" : "text");
          }}
        />
      }
    />
  );
}

export function RJSFLockableInput(props: WidgetProps) {
  const [locked, setLocked] = useState(props.disabled);
  const options = props.options;
  return (
    <Input
      {...options}
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={locked}
      errors={props.rawErrors && !!props.rawErrors.length}
      required={props.required}
      buttons={
        <IconButton
          icon="edit"
          size="mini"
          icon_css="height: 20px; width: 20px"
          borderless={true}
          onClick={() => {
            setLocked(!locked);
          }}
        />
      }
    />
  );
}

export function RJSFClearableInput(props: WidgetProps) {
  const options = props.options;
  return (
    <Input
      {...options}
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={props.disabled}
      errors={props.rawErrors && !!props.rawErrors.length}
      required={props.required}
      buttons={
        <IconButton
          disabled={props.disabled}
          icon="close"
          size="mini"
          icon_css="height: 20px; width: 20px"
          borderless={true}
          onClick={() => {
            props.onChange("");
          }}
        />
      }
    />
  );
}

export function RJSFCancellableInput(props: WidgetProps) {
  const [oldValue, setOldValue] = useState(props.value);
  const [locked, setLocked] = useState(props.disabled);
  const options = props.options;
  return (
    <Input
      {...options}
      value={props.value}
      onChange={(e: any) => props.onChange(e.target.value)}
      disabled={locked}
      errors={props.rawErrors && !!props.rawErrors.length}
      required={props.required}
      buttons={
        locked == true ? (
          <IconButton
            icon="edit"
            size="mini"
            primary
            onClick={() => {
              setLocked(false);
            }}
          />
        ) : (
          <>
            <IconButton
              icon="checkmark"
              size="mini"
              css={"margin-right: 4px;"}
              primary
              onClick={() => {
                setOldValue(props.value);
                setLocked(true);
              }}
            />
            <IconButton
              icon="close"
              size="mini"
              icon_css="color: #858585;"
              onClick={() => {
                props.onChange(oldValue);
                setLocked(true);
              }}
            />
          </>
        )
      }
    />
  );
}
