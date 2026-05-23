function isNumericKey(key: string) {
  return /^\d+$/.test(key);
}

export function safeFlatten(input: any) {
  if (Array.isArray(input)) {
    return input.map(flatten);
  }

  if (!input || typeof input !== "object") {
    throw new Error("Invalid dataset entry");
  }

  return flatten(input);
}

export function flatten(obj: any, prefix = "") {
  let result: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    if (isNumericKey(key)) {
      Object.assign(result, flatten(value, prefix));
      continue;
    }

    const path = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      result[path] = value;
    } else if (value && typeof value === "object") {
      Object.assign(result, flatten(value, path));
    } else {
      result[path] = value;
    }
  }

  return result;
}
