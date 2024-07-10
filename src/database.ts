import { map } from "lodash";
import { Table } from "./table";

export class Database<N extends string, T extends { [K in keyof T]: Table<Extract<keyof T, string>, any> }> {
  readonly name: N;
  readonly tables: T;

  constructor(name: N, tables: T) {
    this.name = name;
    this.tables = tables;
  }

  generateSQL() {
    return `${map(this.tables, (table) => table.generateSQL()).join("\n\n")}`;
  }
}
