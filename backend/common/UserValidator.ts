import { z } from "zod"

export const userSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
  name: z.string(),
  user_pic: z.string().optional(),
})

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
})
