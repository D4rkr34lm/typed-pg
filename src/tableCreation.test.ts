import { Column } from "./column";
import { notNull } from "./columnModifiers";
import { Table } from "./table";
import { boolean, number, text, timestamp, varChar } from "./types";

describe("Table Factory correctly generates SQL statements", () => {
  test("Generating works", () => {
    const should = `CREATE TABLE IF NOT EXISTS test {\n  column1 TEXT\n};`;

    const table = new Table("test", {
      column1: new Column("column1", text()),
    });

    const is = table.generateSQL();

    expect(is).toEqual(should);
  });

  test("Generating works for all types", () => {
    const should = `CREATE TABLE IF NOT EXISTS test {\n  column1 TEXT,\n  column2 DOUBLE,\n  column3 VARCHAR(10),\n  column4 BOOLEAN,\n  column5 TIMESTAMPTZ\n};`;

    const table = new Table("test", {
      column1: new Column("column1", text()),
      column2: new Column("column2", number()),
      column3: new Column("column3", varChar(10)),
      column4: new Column("column4", boolean()),
      column5: new Column("column5", timestamp()),
    });
    const is = table.generateSQL();

    expect(is).toEqual(should);
  });

  test("Generating of modified columns work", () => {
    const should = `CREATE TABLE IF NOT EXISTS test {\n  column1 TEXT NOT NULL\n};`;

    const table = new Table("test", {
      column1: new Column("column1", text(), notNull()),
    });
    const is = table.generateSQL();

    expect(is).toEqual(should);
  });
});
