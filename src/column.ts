import { DBColumnModifier, DBColumnModifierName } from "./columnModifiers";
import { DBType } from "./types";

export class Column<Name extends string, Type extends DBType, Modifiers extends DBColumnModifier[]> {
  readonly name: Name;
  readonly type: Type;
  readonly modifiers: Modifiers;

  constructor(name: Name, type: Type, ...modifiers: Modifiers) {
    this.name = name;
    this.type = type;
    this.modifiers = modifiers;
  }
}
