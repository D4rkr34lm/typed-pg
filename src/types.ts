import { isBoolean, isNull, isNumber, isString, toNumber } from "lodash";
import * as moment from "moment";

export function number() {
  return {
    name: "DOUBLE" as const,
    validator: (value: unknown): value is number | null => {
      return isNull(value) || isNumber(value);
    },
  };
}

export function varChar(length: number) {
  if (length < 1 || length > 255) {
    throw `VarChars length has to be in [1,255] but ${length} was given`;
  }

  return {
    name: `VARCHAR(${length})` as const,
    validator: (value: unknown): value is string | null => {
      return isNull(value) || (isString(value) && value.length >= 0 && value.length < length);
    },
  };
}

export function text() {
  return {
    name: "TEXT" as const,
    validator: (value: unknown): value is string | null => {
      return isNull(value) || isString(value);
    },
  };
}

export function boolean() {
  return {
    name: "BOOLEAN" as const,
    validator: (value: unknown): value is boolean | null => {
      return isNull(value) || isBoolean(value);
    },
  };
}

export function timestamp() {
  return {
    name: "TIMESTAMPTZ" as const,
    validator: (value: unknown): value is Date | null => {
      return isNull(value) || (isString(value) && moment(value).isValid());
    },
  };
}

export const DBTypes = {
  number,
  varChar,
  text,
  boolean,
  timestamp,
};

export type DBTypeName = keyof typeof DBTypes;
export type DBType = ReturnType<(typeof DBTypes)[DBTypeName]>;

export type ExtractApplicableOperators<Type extends DBType> = Type["name"] extends "DOUBLE" | "TIMESTAMPTZ"
  ? ">" | "=>" | "=" | "<" | "<="
  : Type["name"] extends `VARCHAR(${number})` | "TEXT" | "BOOLEAN"
    ? "="
    : never;

export type ExtractType<Type extends DBType> = Type["name"] extends "DOUBLE"
  ? number
  : Type["name"] extends `VARCHAR(${number})` | "TEXT"
    ? `'${string}'`
    : Type["name"] extends "BOOLEAN"
      ? boolean
      : Type["name"] extends "TIMESTAMPTZ"
        ? Date
        : never;

export type SupportedTypes = number | `'${string}'` | boolean | Date;
