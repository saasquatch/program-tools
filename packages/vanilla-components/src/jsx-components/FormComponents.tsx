import { h } from "@stencil/core";

export function onChange(event: Event, FormState: any) {
  const target: HTMLInputElement | null = event.target as HTMLInputElement | null;
  // console.log({ event, target });
  if (target) {
    if (target.validity.typeMismatch || target.validity.tooShort) {
      FormState.errors[target.name] = "invalid";
    } else {
      FormState.errors[target.name] = "valid";
    }
    FormState = {
      ...FormState,
      [target.name]: target.value,
    };
    return FormState;
  } else {
    FormState = {
      ...FormState,
      ...event,
    };
    // console.log({ FormState });
    return FormState;
  }
}

export function getErrors(schema, errors, key) {
  if (errors)
    return errors.map((error) => {
      let errorMessage = "";
      if (error.keyword === "required") {
        errorMessage = `${schema.properties[key].title || key} is required`;
      } else if (error.keyword === "type") {
        errorMessage = `${schema.properties[key].title || key} should be a ${schema.properties[key].type}`;
      } else if (error.keyword === "minItems") {
        errorMessage = `All checkboxes are required to continue`;
      } 
      return {
        message: errorMessage,
      }
    });
}

export function SchemaForm({
  schema,
  property = "",
  onChange,
  formData,
  errors = null,
}) {
  console.log(schema)
  // console.log(schema.type)
  if (schema.type === "object") {
    return (
      <ObjectForm
        schema={schema}
        onChange={onChange}
        formData={formData}
        errors={errors}
      />
    );
  } else if (schema.type === "string") {
    return (
      <StringForm
        schema={schema}
        property={property}
        onChange={onChange}
        formData={formData}
        errors={errors}
      />
    );
  } else if (schema.type === "boolean") {
    return (
      <BooleanForm
        schema={schema}
        property={property}
        onChange={onChange}
        formData={formData}
        errors={errors}
      />
    );
  } else if (schema.type === "number") {
    return (
      <NumberForm
        schema={schema}
        property={property}
        onChange={onChange}
        formData={formData}
        errors={errors}
      />
    );
  } else if (schema.type === "array") {
    return (
      <ArrayForm
        schema={schema}
        property={property}
        onChange={onChange}
        formData={formData}
        errors={errors}
      />
    );
  } else {
    return <div>TODO</div>;
  }
}

export function NumberForm({ schema, property, onChange, formData, errors }) {
  return (
    <div style={{marginTop:"10px"}}>
      <label>{schema.title || property}</label>
      <input
        type="number"
        value={formData}
        onInput={
          // @ts-ignore
          (e) => onChange(e.target.value)
        }
      ></input>
      {errors &&
        errors.map((error) => (
          <p style={{ color: "#e4344b", marginTop: "0.5em" }}>
            {error.message}
          </p>
        ))}
    </div>
  );
}

export function BooleanForm({ schema, property, onChange, formData, errors }) {
  return (
    <div style={{marginTop:"10px"}}>
      <label>{schema.title || property}</label>

      <input
        type="checkbox"
        checked={formData}
        onInput={
          // @ts-ignore
          (e) => onChange(e.target.checked)
        }
      ></input>
      {errors &&
        errors.map((error) => (
          <p style={{ color: "#e4344b", marginTop: "0.5em" }}>
            {error.message}
          </p>
        ))}
    </div>
  );
}

export function LoadingStateSmall() {
  return (
    <div class="container-loading" style={{
      width: "10px", 
      top:"14px",
      left:"15px"
    }}>
      <div class="loading-icon">
        <div class="bar1" style={{
          width: "10px",
          height:"10px"
        }}></div>
      </div>
    </div>
  )
}

export function StringForm({ schema, property, onChange, formData, errors }) {
  return (
    <div style={{marginTop:"24px", width:"100%", textAlign:"center"}}>
      {/* <label>{schema.title || property}</label> */}
      <input
        type="text"
        style={{float:"none", width:"100%", height:"34px", paddingLeft:"15px", border:"2px solid #eee", borderRadius:"6px"}}
        value={formData}
        placeholder={schema.title || property}
        onInput={
          // @ts-ignore
          (e) => onChange(e.target.value)
        }
      ></input>
      {errors &&
        errors.map((error) => (
          <p style={{ color: "#e4344b", marginTop: "0.5em" }}>
            {error.message}
          </p>
        ))}
    </div>
  );
}

export function selectValue(value, selected, all) {
  const at = all.indexOf(value);
  const updated = selected.slice(0, at).concat(value, selected.slice(at));
  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order
  return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b));
}

export function deselectValue(value, selected) {
  return selected.filter((v) => v !== value);
}

export function CheckboxesWidget(props) {
  const { id, options, value, onChange } = props;
  const { enumOptions, inline } = options;
  // console.log({ props });
  return (
    <div class="checkboxes" id={id}>
      {enumOptions.map((option, index) => {
        // console.log({value, option})
        const checked = value.indexOf(option.value) !== -1;
        const checkbox = (
          <span>
            <input
              type="checkbox"
              id={`${id}_${index}`}
              checked={checked}
              onChange={(event: Event & { target: HTMLInputElement }) => {
                const all = enumOptions.map(({ value }) => value);
                // console.log(all)
                if (event.target.checked) {
                  onChange(selectValue(option.value, value, all));
                } else {
                  onChange(deselectValue(option.value, value));
                }
              }}
            />
            <span style={{fontSize:"90%"}}>{option.label}</span>
          </span>
        );
        return inline ? (
          <label key={index} class={`checkbox-inline`}>
            {checkbox}
          </label>
        ) : (
          <div key={index} class={`checkbox`} style={{padding:"4px 0"}}>
            <label>{checkbox}</label>
          </div>
        );
      })}
    </div>
  );
}

// array with checkboxes template
export function ArrayForm({ schema, property, onChange, formData, errors }) {
  const enumOptions = schema.items.enum.map((key, index) => {
    const label = schema.items.enumNames && schema.items.enumNames[index]
    return { label: label || key, value: key };
  });
  const options = {
    enumOptions,
  };
  // console.log({ formData, schema });
  return (
    <div style={{marginTop:"10px"}}>
      <label>{schema.title || property}</label>
      <CheckboxesWidget
        options={options}
        id={`sqh_${property}`}
        onChange={onChange}
        value={formData || []}
      />
      {errors &&
        errors.map((error) => (
          <p style={{ color: "#e4344b", marginTop: "0.5em" }}>
            {error.message}
          </p>
        ))}
    </div>
  );
}
export function ObjectForm({ schema, onChange, formData, errors }) {
  const propKeys = Object.keys(schema.properties);
  return (
    <div>
      <h1 style={{fontSize:"110%", marginTop:"10px"}}>{schema.title || schema.key}</h1>
      {propKeys.map((k) => {
        const subSchema = schema.properties[k];
        const subErrorsList =
          errors &&
          errors.filter((error) => {
            // TODO: do a more robust filter than this, use ajv + pointers?
            return error.dataPath === `/${k}` ? true : false;
          });

        const errorMessages = getErrors(schema, subErrorsList, k);

        const subOnChange = (newVal) => {
          const newTotal = {
            ...formData,
            [k]: newVal,
          };
          onChange(newTotal);
        };
        return (
          <SchemaForm
            schema={subSchema}
            property={k}
            onChange={subOnChange}
            formData={formData[k]}
            errors={
              errorMessages && errorMessages.length ? errorMessages : null
            }
          />
        );
      })}
    </div>
  );
}