import { map } from "lodash";
import { DBColumnModifier } from "./columnModifiers";
import { DBType } from "./types";

interface TableFactoryColumn {
  name: string;
  type: DBType;
  modifiers: DBColumnModifier[];
}

export class TableFactory {
  columns: TableFactoryColumn[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  createColumn(name: string, type: DBType, ...columnModifiers: DBColumnModifier[]) {
    this.columns.push({ name, type, modifiers: columnModifiers });
  }

  generateSQL(): string {
    function columnModifiersToSql(modifiers: DBColumnModifier[]): string {
      return map(modifiers, (modifier) => modifier.name).join(" ");
    }

    function columnToSql(column: TableFactoryColumn): string {
      return `  ${column.name} ${column.type.name} ${columnModifiersToSql(column.modifiers)}, \n`;
    }

    return `CREATE TABLE ${this.name} { \n${map(this.columns, columnToSql).join("")}}`;
  }
}