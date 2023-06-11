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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnimePlanned = exports.deleteAnimeRank = exports.deleteAnime = exports.updateAnimePlanned = exports.updateAnimeRank = exports.updateAnime = exports.createAnimePlanned = exports.createAnimeRank = exports.createAnime = void 0;
const prisma_1 = require("../common/prisma");
const animeValidator_1 = require("../common/animeValidator");
const createAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const anime = req.body;
    const check = animeValidator_1.animeSchema.safeParse(anime);
    if (check.success) {
        try {
            const result = yield prisma_1.prisma.anime.create({
                data: {
                    name: anime.name,
                    category: anime.category,
                    description: anime.description,
                    anime_pic: anime.anime_pic,
                    avg_rank: 0,
                },
            });
            console.log(result);
            res.status(201).json(result);
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    }
    else {
        console.log(check.error);
        res.status(400).json({ message: "parsing error" });
    }
});
exports.createAnime = createAnime;
const createAnimeRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); //anime id
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const animeRank = req.body;
    const check = animeValidator_1.animeRankSchema.safeParse(animeRank);
    if (check.success) {
        const anime = yield prisma_1.prisma.anime.findUnique({
            where: { id },
            include: {
                users: true,
            },
        });
        if (anime == null) {
            res.status(404).send({ message: "anime not found" });
            return;
        }
        if (req.session.userID == null) {
            res.status(401).send({ message: "unauthorized" });
            return;
        }
        try {
            const result = yield prisma_1.prisma.anime_user_rank.create({
                data: {
                    anime_id: anime.id,
                    user_id: req.session.userID,
                    rank: animeRank.rank,
                },
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.createAnimeRank = createAnimeRank;
const createAnimePlanned = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id); //anime id
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const animePlanned = req.body;
    const check = animeValidator_1.animeUserPlannedSchema.safeParse(animePlanned);
    if (check.success) {
        const anime = yield prisma_1.prisma.anime.findUnique({
            where: { id },
            include: {
                users: true,
            },
        });
        if (anime == null) {
            res.status(404).send({ message: "anime not found" });
            return;
        }
        if (req.session.userID == null) {
            res.status(401).send({ message: "unauthorized" });
            return;
        }
        try {
            const result = yield prisma_1.prisma.anime_user_planned.create({
                data: {
                    anime_id: anime.id,
                    user_id: req.session.userID,
                    isPlanned: animePlanned.isPlanned,
                },
            });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ message: "something wents wrong" });
        }
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.createAnimePlanned = createAnimePlanned;
const updateAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const newAnimeDto = req.body;
    const check = animeValidator_1.animeSchema.safeParse(newAnimeDto);
    if (check.success) {
        const anime = yield prisma_1.prisma.anime.update({
            where: { id },
            data: check.data,
        });
        res.status(200).json(anime);
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.updateAnime = updateAnime;
const updateAnimeRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const newAnimeRankDto = req.body;
    const check = animeValidator_1.animeSchema.safeParse(newAnimeRankDto);
    if (check.success) {
        const anime = yield prisma_1.prisma.anime.update({
            where: { id },
            data: check.data,
        });
        res.status(200).json(anime);
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.updateAnimeRank = updateAnimeRank;
const updateAnimePlanned = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).send({ message: "invalid ID" });
        return;
    }
    const newAnimePlannedDto = req.body;
    const check = animeValidator_1.animeSchema.safeParse(newAnimePlannedDto);
    if (check.success) {
        const anime = yield prisma_1.prisma.anime.update({
            where: { id },
            data: check.data,
        });
        res.status(200).json(anime);
    }
    else {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.updateAnimePlanned = updateAnimePlanned;
const deleteAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield prisma_1.prisma.anime.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.status(204).send();
});
exports.deleteAnime = deleteAnime;
const deleteAnimeRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield prisma_1.prisma.anime_user_rank.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.status(204).send();
});
exports.deleteAnimeRank = deleteAnimeRank;
const deleteAnimePlanned = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield prisma_1.prisma.anime_user_planned.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.status(204).send();
});
exports.deleteAnimePlanned = deleteAnimePlanned;
