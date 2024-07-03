import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "configs/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://AI-Form-Builder_owner:fyBJN1zC0mFn@ep-calm-firefly-a5d2ekcu.us-east-2.aws.neon.tech/AI-Form-Builder?sslmode=require",
  }
});