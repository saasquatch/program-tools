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

export const UNITS = [
  {
    multiplier: 1000,
    name: "second",
    threshold: 45,
  },
  {
    multiplier: 60,
    name: "minute",
    threshold: 45,
  },
  {
    multiplier: 60,
    name: "hour",
    threshold: 22,
  },
  {
    multiplier: 24,
    name: "day",
    threshold: 5,
  },
  {
    multiplier: 7,
    name: "week",
    threshold: 4,
  },
  {
    multiplier: 30,
    name: "month",
    threshold: 12,
  },
  {
    multiplier: 4,
    name: "year",
    threshold: null,
  },
];

type Config = {
  thresholds?: any;
};

export const selectRelativeTimeUnit = (
  to: number,
  from: number = Date.now(),
  config = {} as Config
) => {
  const { thresholds = {} } = config;

  let diff = to - from;
  let value = diff;
  let unit = "milliseconds";

  for (let u of UNITS) {
    const threshold = u.name in thresholds ? thresholds[u.name] : u.threshold;

    value = value / u.multiplier;
    unit = u.name;

    if (typeof threshold !== "number" || Math.abs(value) < threshold) {
      break;
    }
  }

  if (Math.abs(value) < 1) {
    value = value > 0 ? 1 : -1;
  } else {
    value = Math.round(value);
  }

  return {
    unit,
    value,
  };
};
