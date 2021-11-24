import { RequiredPropsErrorProps } from "./RequiredPropsError";

export function format(first: string, middle: string, last: string): string {
  return (
    (first || "") + (middle ? ` ${middle}` : "") + (last ? ` ${last}` : "")
  );
}

function readGetters(obj: Object) {
  var result = [];
  Object.keys(obj).forEach((property) => {
    var descriptor = Object.getOwnPropertyDescriptor(obj, property);
    if (typeof descriptor.get === "function") {
      result.push(property);
    }
  });
  return result;
}

// turns the "get" prototypes on stencil "this" objects into regular properties
// basically you can't do {...this} in stencil components before calling this
export function getProps<T>(obj: T): T {
  let props: T = {} as T;
  for (const k of readGetters(Object.getPrototypeOf(obj))) {
    props[k] = obj[k];
  }
  return props;
}

export function middleClickLink(e: MouseEvent, path: string) {
  e.preventDefault();
  Object.assign(document.createElement("a"), {
    target: "_blank",
    href: path,
  }).click();
}

type RequiredProps = {
  attribute: string;
  value: string | boolean | number;
}[];

export function getMissingProps(props: RequiredProps) {
  const missingProps = props.filter((prop) => !prop.value);
  return missingProps.length ? missingProps : false;
}
