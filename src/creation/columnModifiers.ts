import { isNull } from "lodash";

export function notNull() {
  return {
    name: "NOT NULL",
    modifyFromDB: <T>(value: T | null): T => {
      if (isNull(value)) {
        throw "Database integrity has been lost! A column specified as NOT NULL contains null";
      }
      return value;
    },
    modifyToDB: <T extends {}>(value: T): T => {
      return value;
    },
  };
}

const DBColumnModifier = { notNull };

export type DBColumnModifierName = keyof typeof DBColumnModifier;
export type DBColumnModifier = ReturnType<(typeof DBColumnModifier)[DBColumnModifierName]>;
