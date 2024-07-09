import { DatabaseFactory } from "./databaseFactory";
import { TableFactory } from "./tableFactory";
import { boolean, number, text, timestamp, varChar } from "./types";

describe("Database Factory correctly generates SQL statements", () => {
  test("Generates CREATE statemens for tables", () => {
    const table1SQL = `CREATE TABLE IF NOT EXISTS test1 {\n  column1 TEXT,\n  column2 DOUBLE,\n  column3 VARCHAR(10),\n  column4 BOOLEAN,\n  column5 TIMESTAMPTZ\n};`;
    const table2SQL = `CREATE TABLE IF NOT EXISTS test2 {\n  column1 TEXT\n};`;

    const should = table1SQL + "\n\n" + table2SQL;

    const factory1 = new TableFactory("test1");
    factory1.createColumn("column1", text());
    factory1.createColumn("column2", number());
    factory1.createColumn("column3", varChar(10));
    factory1.createColumn("column4", boolean());
    factory1.createColumn("column5", timestamp());

    const factory2 = new TableFactory("test2");
    factory2.createColumn("column1", text());

    const dbFactory = new DatabaseFactory("test");
    dbFactory.addTable(factory1);
    dbFactory.addTable(factory2);

    const is = dbFactory.generateSQL();

    expect(is).toEqual(should);
  });
});
