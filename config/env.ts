import {
  object,
  safeParse,
  string,
  optional,
  union,
  literal,
  type InferInput,
  number,
} from "valibot";

  // host: "localhost",
  // port: 5432,
  // user: "postgres",
  // password: "12345678",
  // database: "postgres",
  // max: 5,
// Define your environment schema
const EnvSchema = object({
  DB_HOST: optional(string(), "localhost"),
  DB_PORT: optional(number(), 5432),
  POSTGRES_USER: optional(string(), "postgres"),
  POSTGRES_PASSWORD: optional(string(), "12345678"),
  POSTGRES_DB: optional(string(), "postgres"),
  DB_POOL: optional(number(), 5),
  NODE_ENV: union([
    literal("development"),
    literal("production"),
    literal("test"),
  ]),
});

// Create a type from the schema
export type Env = InferInput<typeof EnvSchema>;

export function getEnv(): Env {
  const result = safeParse(EnvSchema, import.meta.env);

  if (!result.success) {
    console.error("Environment validation failed:", result.issues);
    throw new Error("Missing required environment variables");
  }

  return result.output;
}

// For easier access throughout your app
export const env = getEnv();
