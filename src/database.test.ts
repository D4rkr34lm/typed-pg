import { Column } from "./column";
import { Database } from "./database";
import { Table } from "./table";
import { boolean, number, text, timestamp, varChar } from "./types";

describe("Database correctly generates SQL statements", () => {
  test("Generates CREATE statemens for tables", () => {
    const table1SQL = `CREATE TABLE IF NOT EXISTS test1 {\n  column1 TEXT,\n  column2 DOUBLE,\n  column3 VARCHAR(10),\n  column4 BOOLEAN,\n  column5 TIMESTAMPTZ\n};`;
    const table2SQL = `CREATE TABLE IF NOT EXISTS test2 {\n  column1 TEXT\n};`;

    const should = table1SQL + "\n\n" + table2SQL;

    const table1 = new Table("test1", {
      column1: new Column("column1", text()),
      column2: new Column("column2", number()),
      column3: new Column("column3", varChar(10)),
      column4: new Column("column4", boolean()),
      column5: new Column("column5", timestamp()),
    });

    const table2 = new Table("test2", {
      column1: new Column("column1", text()),
    });

    const db = new Database("test", {
      test1: table1,
      test2: table2,
    });

    const is = db.generateSQL();

    expect(is).toEqual(should);
  });
});
