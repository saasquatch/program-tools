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
export function getProps<T>(obj: T): T {
  let props: T = {} as T;
  for (const k of readGetters(Object.getPrototypeOf(obj))) {
    props[k] = obj[k];
  }
  return props;
}
