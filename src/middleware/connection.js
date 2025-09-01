import pg from "pg";
import { config } from "dotenv";

config();

export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // necesario para Supabase
});

export default pool;
