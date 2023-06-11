"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeUserRankSchema = exports.animeUserPlannedSchema = exports.animeRankSchema = exports.animeSchema = void 0;
const zod_1 = require("zod");
const isRanked = (n) => n == "S+" ||
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
    n == "C-";
exports.animeSchema = zod_1.z.object({
    name: zod_1.z.string(),
    category: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    anime_pic: zod_1.z.string().optional(),
    avg_rank: zod_1.z.number().optional(),
    amount: zod_1.z.number().optional(),
});
exports.animeRankSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    anime_pic: zod_1.z.string().optional(),
    rank: zod_1.z.string(),
});
exports.animeUserPlannedSchema = zod_1.z.object({
    isPlanned: zod_1.z.boolean().default(true),
});
exports.animeUserRankSchema = zod_1.z.object({
    name: zod_1.z.string(),
    category: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    anime_pic: zod_1.z.string().optional(),
    rank: zod_1.z.string().refine(isRanked),
});
