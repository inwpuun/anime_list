import { z } from "zod"

const isRanked = (n: string) =>
  n == "S+" ||
  n == "S" ||
  n == "S-" ||
  n == "A+" ||
  n == "A" ||
  n == "A-" ||
  n == "B+" ||
  n == "B" ||
  n == "B-" ||
  n == "C+" ||
  n == "C" ||
  n == "C-"

export const animeSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  anime_pic: z.string().optional(),
  avg_rank: z.number().optional(),
  amount: z.number().optional(),
})

export const animeRankSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  anime_pic: z.string().optional(),
  rank: z.string(),
})

export const animeUserPlannedSchema = z.object({
  isPlanned: z.boolean().default(true),
})

export const animeUserRankSchema = z.object({
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  anime_pic: z.string().optional(),
  rank: z.string().refine(isRanked),
})
