import { Pool } from "pg";
import { Database } from "./database";
import { PathLike, writeFileSync } from "fs";
import { ExtractApplicableOperators, ExtractType, SupportedTypes } from "./types";
export interface DBCredentials {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface PoolSettings {
  max: number;
}

export async function initDB(
  databaseObject: Database<any, any>,
  credentials: DBCredentials,
  poolSettings: PoolSettings,
  logger: (...message: string[]) => void = (...message) => {},
  sqlOutputFolder?: PathLike,
) {
  const pool = new Pool({ ...credentials, ...poolSettings, log: logger });
  const createQuery = databaseObject.generateSQL();
  await pool.query(createQuery).catch(() => {
    logger("Failed to init DB");
    throw "Failed to init DB";
  });
  logger("Database has been initialized");
  logger(createQuery);

  if (sqlOutputFolder) {
    writeFileSync(sqlOutputFolder + "createQuery.sql", createQuery);
  }
}

export function createSimpleFetchQuery<DB extends Database<any, any>>(db: DB) {
  type Tables = DB["tables"];

  return {
    from<TableName extends Extract<keyof Tables, string>>(tableName: TableName) {
      type ColumnsOfTable = DB["tables"][TableName]["columns"];
      //TODO
      return {
        select<ColumnNames extends Extract<keyof ColumnsOfTable, string>[]>(...columns: ColumnNames[]) {
          //TODO
          type ExtractCompatibleColumnNames<
            ColumnName extends Extract<keyof ColumnsOfTable, string>,
            ColumnType extends SupportedTypes,
          > = {
            [K in Exclude<Extract<keyof ColumnsOfTable, string>, ColumnName>]: ExtractType<
              ColumnsOfTable[K]["type"]
            > extends ColumnType
              ? K
              : never;
          };

          function where<
            SubjectColumnName extends Extract<keyof ColumnsOfTable, string>,
            Operator extends ExtractApplicableOperators<ColumnsOfTable[SubjectColumnName]["type"]>,
            Object extends
              | ExtractType<ColumnsOfTable[SubjectColumnName]["type"]>
              | ExtractCompatibleColumnNames<
                  SubjectColumnName,
                  ExtractType<ColumnsOfTable[SubjectColumnName]["type"]>
                >[Exclude<Extract<keyof ColumnsOfTable, string>, SubjectColumnName>],
          >(subject: SubjectColumnName, operator: Operator, object: Object) {
            //TODO
            return {
              where,
            };
          }

          return {
            where,
          };
        },
      };
    },
  };
}
