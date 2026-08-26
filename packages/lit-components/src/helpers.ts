/**
 * Converts kebab-case to camelCase
 */
function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function getProps(host: HTMLElement) {
  const attrs: Record<string, string> = {};
  for (let i = 0; i < host.attributes.length; i++) {
    const attr = host.attributes[i];
    const camelCaseKey = kebabToCamel(attr.name);
    attrs[camelCaseKey] = attr.value;
  }
  return attrs;
}
