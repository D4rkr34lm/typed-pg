import { Column } from "./column";
import { Database } from "./database";
import { Table } from "./table";
import { number, text, varChar } from "./types";
import { createSimpleFetchQuery } from "./index";

describe("Data fetch queries correctly generate SQL", () => {
  const table1 = new Table("test1", {
    name: new Column("name", varChar(10)),
    age: new Column("age", number()),
  });

  const table2 = new Table("test2", {
    other: new Column("other", text()),
  });

  const db = new Database("test", {
    test1: table1,
    test2: table2,
  });

  test("Queries can be created", () => {
    createSimpleFetchQuery(db).from("test1").select(["age"]).where("name", "=", "'Manuel'");
  });
});
