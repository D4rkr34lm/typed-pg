import { map } from "lodash";
import { Column } from "./column";
import { DBColumnModifier } from "./columnModifiers";

export class Table<N extends string, C extends { [K in keyof C]: Column<Extract<keyof C, string>, any, any> }> {
  name: N;
  columns: C;

  constructor(name: N, columns: C) {
    this.name = name;
    this.columns = columns;
  }

  generateSQL(): string {
    function columnModifiersToSql(modifiers: DBColumnModifier[]): string {
      return modifiers.length === 0 ? "" : " " + map(modifiers, (modifier) => modifier.name).join(" ");
    }

    function columnToSql(column: any): string {
      return `  ${column.name} ${column.type.name}${columnModifiersToSql(column.modifiers)}`;
    }

    return `CREATE TABLE IF NOT EXISTS ${this.name} {\n${map(this.columns, columnToSql).join(",\n")}\n};`;
  }
}
