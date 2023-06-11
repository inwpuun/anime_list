"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string(),
    user_pic: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
