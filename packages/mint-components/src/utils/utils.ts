export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
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