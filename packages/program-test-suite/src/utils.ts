import {World} from '..';

export function inferType(
  val: string,
): string | number | boolean | undefined | null {
  if (/^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(val)) {
    return Number(val);
  }

  if (val.toLowerCase() === 'true' || val.toLowerCase() === 'yes') {
    return Boolean(true);
  }
  if (val.toLowerCase() === 'false' || val.toLowerCase() === 'no') {
    return Boolean(false);
  }

  if (val === 'undefined') {
    return undefined;
  }

  if (val === 'null') {
    return null;
  }

  return val;
}
