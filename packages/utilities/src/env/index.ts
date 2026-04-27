import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Optional URL helper: empty strings should be treated as "not set"
 * so we don't trip the URL validator in dev or preview environments
 * that haven't fully wired up every integration yet.
 */
const optionalString = z
  .string()
  .optional()
  .transform((v) => (v && v.length > 0 ? v : undefined));

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // Required for full app functionality, but kept optional so the marketing
    // pages can render even before integrations are connected.
    DATABASE_URL: optionalString,
    GOOGLE_CLIENT_ID: optionalString,
    GOOGLE_CLIENT_SECRET: optionalString,
    CF_R2_ENDPOINT: optionalString,
    CF_R2_ACCESS_KEY_ID: optionalString,
    CF_R2_SECRET_ACCESS_KEY: optionalString,
    CF_R2_BUCKET_NAME: optionalString,
    CF_R2_PUBLIC_DOMAIN: optionalString,
  },
  client: {
    NEXT_PUBLIC_POSTHOG_HOST: optionalString,
    NEXT_PUBLIC_POSTHOG_KEY: optionalString,
    NEXT_PUBLIC_BASE_URL: z.string().default("http://localhost:3000"),
    NEXT_PUBLIC_TRPC_BASE_URL: z.string().default("http://localhost:3000/api/trpc"),
  },
  runtimeEnv: {
    // =========== SERVER ===========
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CF_R2_ENDPOINT: process.env.CF_R2_ENDPOINT,
    CF_R2_ACCESS_KEY_ID: process.env.CF_R2_ACCESS_KEY_ID,
    CF_R2_SECRET_ACCESS_KEY: process.env.CF_R2_SECRET_ACCESS_KEY,
    CF_R2_BUCKET_NAME: process.env.CF_R2_BUCKET_NAME,
    CF_R2_PUBLIC_DOMAIN: process.env.CF_R2_PUBLIC_DOMAIN,
    // =========== PUBLIC ===========
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_TRPC_BASE_URL: process.env.NEXT_PUBLIC_TRPC_BASE_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
