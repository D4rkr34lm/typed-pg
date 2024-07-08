import { isBoolean, isNull, isNumber, isString, toNumber } from "lodash";
import * as moment from "moment";

function noTransform<T>(value: T | null): T | null {
  return value;
}

export function number() {
  return {
    type: "DOUBLE" as const,
    validator: (value: unknown): value is number | null => {
      return isNull(value) || isNumber(value);
    },
    fromDB: noTransform,
    toDB: toNumber,
  };
}

export function varChar(length: number) {
  if (length < 1 || length > 255) {
    throw `VarChars length has to be in [1,255] but ${length} was given`;
  }

  return {
    type: `VARCHAR${length}` as const,
    validator: (value: unknown): value is string | null => {
      return isNull(value) || (isString(value) && value.length >= 0 && value.length < length);
    },
    fromDB: noTransform,
    toDB: noTransform,
  };
}

export function text() {
  return {
    type: "TEXT" as const,
    validator: (value: unknown): value is string | null => {
      return isNull(value) || isString(value);
    },
    fromDB: noTransform,
    toDB: noTransform,
  };
}

export function boolean() {
  return {
    type: "BOOLEAN" as const,
    validator: (value: unknown): value is boolean | null => {
      return isNull(value) || isBoolean(value);
    },
    fromDB: (value: any): boolean => {
      return value as boolean;
    },
    toDB: noTransform,
  };
}

export function timestamp() {
  return {
    type: "TIMESTAMPTZ" as const,
    validator: (value: unknown): value is Date | null => {
      return isNull(value) || (isString(value) && moment(value).isValid());
    },
    fromDB: (value: any) => {
      return new Date(value);
    },
    toDB: (date: Date) => {
      return date.toUTCString();
    },
  };
}

export const DBTypeFactories = {
  number: number,
  varChar: varChar,
  text: text,
  boolean: boolean,
  timestamp: timestamp,
};

export type DBTypeName = keyof typeof DBTypeFactories;
export type DBTypeFactory = (typeof DBTypeFactories)[DBTypeName];
