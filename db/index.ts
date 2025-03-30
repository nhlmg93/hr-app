// Make sure to install the 'pg' package
import { env } from "config/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  max: env.DB_POOL,
  ssl: false,
});

export const db = drizzle(pool);
