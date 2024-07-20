import { map } from "lodash";
import { Table } from "./table";

export class Database<Name extends string, Tables extends { [K in keyof Tables]: Table<Extract<K, string>, any> }> {
  readonly name: Name;
  readonly tables: Tables;

  constructor(name: Name, tables: Tables) {
    this.name = name;
    this.tables = tables;
  }

  generateSQL() {
    return `${map(this.tables, (table) => table.generateSQL()).join("\n\n")}`;
  }
}
