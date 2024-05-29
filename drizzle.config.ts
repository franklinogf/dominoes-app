import type { Config } from "drizzle-kit"
export default {
  schema: "./db/schema.ts",
  dialect: "sqlite",
  out: "./drizzle",
  driver: "expo", // <--- very important
  verbose: true,
} satisfies Config
