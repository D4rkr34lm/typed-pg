import { Pool } from "pg";
import { Database } from "./database";
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
  factory: Database<any, any>,
  credentials: DBCredentials,
  poolSettings: PoolSettings,
  logger?: (...message: string[]) => void,
) {
  const pool = new Pool({ ...credentials, ...poolSettings });
  const createQuerry = factory.generateSQL();
  await pool.query(createQuerry).catch(() => {
    throw "Failed to init DB";
  });
}
