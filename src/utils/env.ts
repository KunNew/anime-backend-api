import { z } from "zod";

const envVariables = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().default("8080"),
  ALLOWED_HOSTS: z.string().default("*"),
  BLOCK_WITH_CORS: z.preprocess(Boolean, z.boolean()).default(false),
  RATE_LIMIT: z.string().default("80"),
  RATE_LIMIT_DURATION: z.string().default("60000"),
  PROXY_URL: z.string().default(""),
  BACKEND_URL: z.string().default("https://api.amvstr.me/api/v2"),
  BASE_BACKEND_URL: z.string().default("https://api.amvstr.me"),
  HASH_IP: z.preprocess(Boolean, z.boolean()).default(false),
});

export const env = envVariables.parse(process.env);
