function format(first, middle, last) {
  return ((first || "") + (middle ? ` ${middle}` : "") + (last ? ` ${last}` : ""));
}
function readGetters(obj) {
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
function getProps(obj) {
  let props = {};
  for (const k of readGetters(Object.getPrototypeOf(obj))) {
    props[k] = obj[k];
  }
  return props;
}
function middleClickLink(e, path) {
  e.preventDefault();
  Object.assign(document.createElement("a"), {
    target: "_blank",
    href: path,
  }).click();
}
function getMissingProps(props) {
  const missingProps = props.filter((prop) => !prop.value);
  return missingProps.length ? missingProps : false;
}
function luxonLocale(locale) {
  const splitLocale = locale === null || locale === void 0 ? void 0 : locale.split("_");
  if (!splitLocale || splitLocale.length === 1)
    return locale;
  const language = splitLocale[0];
  const country = splitLocale[1];
  return `${language}-${country.toUpperCase()}`;
}

export { getMissingProps as a, getProps as g, luxonLocale as l };
