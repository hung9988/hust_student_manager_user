/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./drizzle/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://postgres:BMvsgy.s@5Kw3FQ@143.198.80.235:5432/postnuxtDO",
  },
  out: "./drizzle",
};
