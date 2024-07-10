import { DBColumnModifier, DBColumnModifierName } from "./columnModifiers";
import { DBType } from "./types";

export class Column<N extends string, T extends DBType, M extends DBColumnModifier[]> {
  readonly name: N;
  readonly type: T;
  readonly modifiers: M;

  constructor(name: N, type: T, ...modifiers: M) {
    this.name = name;
    this.type = type;
    this.modifiers = modifiers;
  }
}
