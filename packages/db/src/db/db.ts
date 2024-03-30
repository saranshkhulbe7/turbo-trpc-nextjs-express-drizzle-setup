import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  uri: "mysql://admin-0ecf:admin123@mysql.gb.stackcp.com:59665/upshot-3136356e74",
});

export const db = drizzle(pool);
