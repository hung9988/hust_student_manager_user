/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://postgres:0000@localhost:5432/postnuxt",
  },
};
