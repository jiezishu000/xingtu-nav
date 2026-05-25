import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32).optional().default('xingtu-dev-jwt-secret-min-32-chars!!'),
  DEEPSEEK_API_KEY: z.string().optional().default(''),
  KIMI_API_KEY: z.string().optional().default(''),
  CF_GATEWAY_URL: z.string().optional().default(''),
  CF_API_KEY: z.string().optional().default(''),
  NEXT_PUBLIC_SITE_URL: z.string().optional().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  BASIC_AUTH_USER: z.string().optional().default('xingtu'),
  BASIC_AUTH_PASS: z.string().optional().default('xingtu2024'),
})

let validatedEnv: z.infer<typeof envSchema>

try {
  validatedEnv = envSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    const missing = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n')
    console.error('环境变量验证失败:\n', missing)
    if (process.env.NODE_ENV === 'production') process.exit(1)
    validatedEnv = envSchema.parse({})
  }
  throw error
}

export const env = validatedEnv
