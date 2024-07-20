import { map } from "lodash";
import { Column } from "./column";
import { DBColumnModifier } from "./columnModifiers";
import { DBType } from "./types";

export class Table<
  Name extends string,
  Columns extends { [K in keyof Columns]: Column<Extract<K, string>, any, any> },
> {
  readonly name: Name;
  readonly columns: Columns;

  constructor(name: Name, columns: Columns) {
    this.name = name;
    this.columns = columns;
  }

  generateSQL(): string {
    function columnModifiersToSql(modifiers: DBColumnModifier[]): string {
      return modifiers.length === 0 ? "" : " " + map(modifiers, (modifier) => modifier.name).join(" ");
    }

    function columnToSql(column: Column<string, DBType, DBColumnModifier[]>): string {
      return `  ${column.name} ${column.type.name}${columnModifiersToSql(column.modifiers)}`;
    }

    return `CREATE TABLE IF NOT EXISTS ${this.name} {\n${map(this.columns, columnToSql).join(",\n")}\n};`;
  }
}
