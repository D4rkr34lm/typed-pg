import { notNull } from "./columnModifiers";
import { TableFactory } from "./tableFactory";
import { boolean, number, text, timestamp, varChar } from "./types";

describe("Table Factory correctly generates SQL statements", () => {
  test("Generating works", () => {
    const should = `CREATE TABLE IF NOT EXISTS test {\n  column1 TEXT\n};`;

    const factory = new TableFactory("test");
    factory.createColumn("column1", text());
    const is = factory.generateSQL();

    expect(is).toEqual(should);
  });

  test("Generating works for all types", () => {
    const should = `CREATE TABLE IF NOT EXISTS test {\n  column1 TEXT,\n  column2 DOUBLE,\n  column3 VARCHAR(10),\n  column4 BOOLEAN,\n  column5 TIMESTAMPTZ\n};`;

    const factory = new TableFactory("test");
    factory.createColumn("column1", text());
    factory.createColumn("column2", number());
    factory.createColumn("column3", varChar(10));
    factory.createColumn("column4", boolean());
    factory.createColumn("column5", timestamp());
    const is = factory.generateSQL();

    expect(is).toEqual(should);
  });

  test("Generating of modified columns work", () => {
    const should = `CREATE TABLE IF NOT EXISTS test {\n  column1 TEXT NOT NULL\n};`;

    const factory = new TableFactory("test");
    factory.createColumn("column1", text(), notNull());
    const is = factory.generateSQL();

    expect(is).toEqual(should);
  });
});
