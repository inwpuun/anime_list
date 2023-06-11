"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollAnime = exports.getProfile = exports.logout = exports.userLogin = exports.createUser = void 0;
const prisma_1 = require("../common/prisma");
const UserValidator_1 = require("../common/UserValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = UserValidator_1.userSchema.safeParse(user);
    console.log(user);
    if (result.success) {
        const hashpassword = yield bcrypt_1.default.hash(result.data.password, 10);
        try {
            const newUser = yield prisma_1.prisma.user.create({
                data: {
                    username: result.data.username,
                    password: hashpassword,
                    name: result.data.name,
                    user_pic: result.data.user_pic,
                },
            });
            res.status(200).json({ message: "sign up successful" });
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (e.code === "P2002") {
                    res.status(400).json({
                        message: "There is a unique constraint violation, a new user cannot be created with this email",
                    });
                }
            }
            // throw e;
        }
    }
    else {
        res.status(400).json(result.error);
    }
});
exports.createUser = createUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = UserValidator_1.loginSchema.safeParse(req.body);
    if (result.success) {
        const username = result.data.username;
        const user = yield prisma_1.prisma.user.findUnique({
            where: { username },
        });
        if (user == null) {
            res.status(400).json({
                message: "Account With this Username doesn't exist",
            });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Your username or password might be wrong!!",
            });
            return;
        }
        req.session.userID = user.id;
        req.session.username = username;
        res.status(200).json({ message: "login successful" });
    }
    else {
        res.status(400).json(result.error);
    }
});
exports.userLogin = userLogin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy(() => {
        res.status(200).json({ message: "logout successful" });
    });
});
exports.logout = logout;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = req.session;
    if (session.userID == undefined || session.username == undefined) {
        req.session.userID = -1;
        req.session.username = "";
        console.log("create session successfully!");
        res.status(401).json({ message: "user doesn't log in.." });
        return;
    }
    else if (session.username === "") {
        res.status(401).json({ message: "user doesn't log in..." });
        return;
    }
    else {
        const userSession = {
            userID: session.userID,
            username: session.username,
        };
        res.status(200).json(userSession);
    }
});
exports.getProfile = getProfile;
const enrollAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animeid = parseInt(req.params.id);
    if (Number.isNaN(animeid)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
    }
    try {
        const session = req.session;
        console.log(session);
        if (session.username == "") {
            res.status(401).json({
                message: "User need to login before enroll anime.",
            });
            return;
        }
        const anime = yield prisma_1.prisma.anime.findUnique({
            where: { id: animeid },
            include: { users: true },
        });
        if (anime == null) {
            res.status(400).json({ message: "anime not found" });
            return;
        }
        if (anime.users.find((v) => v.username == session.username) !== undefined) {
            res.status(400).json({ message: "user already in anime" });
            return;
        }
        const updateAnime = yield prisma_1.prisma.anime.update({
            where: { id: animeid },
            data: {
                amount: { increment: 1 },
                users: { connect: { username: session.username } },
            },
        });
        res.status(200).json({ message: "join anime successful" });
    }
    catch (error) {
        // res.status(400).json({ message: "something went wrong" });
        console.log(error);
        res.status(400).send(error);
    }
});
exports.enrollAnime = enrollAnime;
