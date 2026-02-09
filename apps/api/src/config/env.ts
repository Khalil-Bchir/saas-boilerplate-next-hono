import { z } from 'zod'
import dotenv from 'dotenv'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../../../../')

const nodeEnv = process.env.NODE_ENV
if (!nodeEnv) {
  console.error('❌ NODE_ENV is required. Set it to development, staging, or production.')
  process.exit(1)
}

const envFile = path.join(projectRoot, `.env.${nodeEnv}`)
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile })
} else {
  console.error(`❌ Environment file not found: ${envFile}. Create it from env.${nodeEnv}.example`)
  process.exit(1)
}

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'staging']),
    PORT: z.string().min(1),
    API_URL: z.string().optional(),
    WEB_URL: z.string().optional(),
    ALLOWED_ORIGINS: z.string().optional(),
    RATE_LIMIT_WINDOW_MS: z.string().optional(),
    RATE_LIMIT_MAX_REQUESTS: z.string().optional(),
    
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),

    SUPABASE_URL: z.string().min(1),
    SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
    SUPABASE_EMAIL_REDIRECT_URL: z.string().url().optional(),
    SUPABASE_RESET_REDIRECT_URL: z.string().url().optional(),
    SUPABASE_OAUTH_REDIRECT_URL: z.string().url().optional(),

    JWT_SECRET: z.string().optional(),
    COOKIE_SECRET: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.NODE_ENV === 'production' || data.NODE_ENV === 'staging') {
      if (!data.API_URL || data.API_URL.trim() === '') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['API_URL'], message: 'Required in production and staging' })
      }
      if (!data.WEB_URL || data.WEB_URL.trim() === '') {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['WEB_URL'], message: 'Required in production and staging' })
      }
      if (!data.ALLOWED_ORIGINS || data.ALLOWED_ORIGINS.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['ALLOWED_ORIGINS'],
          message: 'Required in production and staging',
        })
      }
    }
  })

export type Env = z.infer<typeof envSchema>

function getEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:')
      error.errors.forEach((err) => {
        console.error(`  ${err.path.join('.')}: ${err.message}`)
      })
      process.exit(1)
    }
    throw error
  }
}

export const env = getEnv()
