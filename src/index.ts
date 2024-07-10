import { Pool } from "pg";
import { Database } from "./database";
import { PathLike, PathOrFileDescriptor, writeFile, writeFileSync } from "fs";
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

async function initDB(
  databaseObject: Database<any, any>,
  credentials: DBCredentials,
  poolSettings: PoolSettings,
  logger: (...message: string[]) => void = (...message) => {},
  sqlOutputFolder?: PathLike,
) {
  const pool = new Pool({ ...credentials, ...poolSettings, log: logger });
  const createQuerry = databaseObject.generateSQL();
  await pool.query(createQuerry).catch(() => {
    logger("Failed to init DB");
    throw "Failed to init DB";
  });
  logger("Database has been initialized");
  logger(createQuerry);

  if (sqlOutputFolder) {
    writeFileSync(sqlOutputFolder + "createQuerry.sql", createQuerry);
  }
}
