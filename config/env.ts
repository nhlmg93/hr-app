import "dotenv/config";

import {
  object,
  safeParse,
  string,
  optional,
  union,
  literal,
  transform,
  pipe,
  type InferOutput,
} from "valibot";

// Define your environment schema
const EnvSchema = object({
  DB_HOST: optional(string(), "localhost"),
  DB_PORT: pipe(
    optional(string(), "5432"),
    transform((input) => Number(input))
  ),
  POSTGRES_USER: optional(string(), "postgres"),
  POSTGRES_PASSWORD: optional(string(), "12345678"),
  POSTGRES_DB: optional(string(), "postgres"),
  DB_POOL: pipe(
    optional(string(), "5"),
    transform((input) => Number(input))
  ),
  NODE_ENV: union([
    literal("development"),
    literal("production"),
    literal("test"),
  ]),
});

// Create a type from the schema
export type Env = InferOutput<typeof EnvSchema>;

export function getEnv(): Env {
  const result = safeParse(EnvSchema, process.env);

  if (!result.success) {
    console.error("Environment validation failed:", result.issues);
    throw new Error("Missing required environment variables");
  }

  return result.output;
}

// For easier access throughout your app
export const env = getEnv();
