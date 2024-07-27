import { Column } from "./column";
import { DBColumnModifier } from "./columnModifiers";
import { Table } from "./table";
import { DBType } from "./types";

export class FetchQuery<
  FromTables extends { [K in keyof FromTables]: Table<Extract<K, string>, any> },
  SelectedColumns extends { [K in keyof SelectedColumns]: Column<Extract<K, string>, DBType, DBColumnModifier[]> },
> {
  readonly fromTables: FromTables;
  readonly selectedColumns: SelectedColumns;
}

export class WhereCondition<
  DataType extends DBType,
  AColumn extends Column<string, DataType, DBColumnModifier[]>,
  Operator,
  BColumn extends Column<string, DataType, DBColumnModifier[]>,
> {
  readonly a: AColumn;
  readonly operator: Operator;
  readonly b: BColumn;
}
