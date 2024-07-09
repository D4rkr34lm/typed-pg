import { map } from "lodash";
import { TableFactory } from "./tableFactory";

export class DatabaseFactory {
  private name: string;
  private tableFactories: TableFactory[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addTable(factory: TableFactory) {
    this.tableFactories.push(factory);
  }

  generateSQL() {
    return `${map(this.tableFactories, (factory) => factory.generateSQL()).join("\n\n")}`;
  }
}
