import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";
import mysql2 from "mysql2/promise";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const doMigrate = async () => {
  try {
    const dbConnection = await mysql2.createConnection({
      uri: "mysql://admin-0ecf:admin123@mysql.gb.stackcp.com:59665/upshot-3136356e74",
    });
    const dbMigrator = drizzle(dbConnection);

    await migrate(dbMigrator, {
      migrationsFolder: path.resolve(".drizzle", "migrations"),
    });
    console.log("migration done");
    process.exit(0);
  } catch (e) {
    console.log("migration error: ", e);
    process.exit(0);
  }
};
doMigrate();
