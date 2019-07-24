export function inferType(val: string): any {
  if (/^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(val)) {
    return Number(val);
  }

  if (val.toLowerCase() === 'true' || val.toLowerCase() === 'yes') {
    return true;
  }
  if (val.toLowerCase() === 'false' || val.toLowerCase() === 'no') {
    return false;
  }

  switch (val) {
    case 'undefined':
      return undefined;
    case 'null':
      return null;
    case 'NaN':
      return NaN;
    default:
      break;
  }

  // Handle arrays one level deep
  if (val.startsWith('[') && val.endsWith(']')) {
    return val
      .substring(1, val.length - 1)
      .split(',')
      .map(v => v.trim())
      .map(v => {
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        ) {
          return v.substring(1, v.length);
        } else {
          return inferType(v);
        }
      });
  }

  return val;
}
