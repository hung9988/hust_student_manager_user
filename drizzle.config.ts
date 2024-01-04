/** @type { import("drizzle-kit").Config } */

export default {
  schema: "./drizzle/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL_ADMIN,
  },
  out: "./drizzle",
};
