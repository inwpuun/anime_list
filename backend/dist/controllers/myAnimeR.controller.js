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
exports.getAnimeByID = exports.getAllAnime = exports.getPlannedAnime = exports.getRankAnimeWithLimit = exports.getRankAnime = exports.getAllRank = void 0;
const prisma_1 = require("../common/prisma");
const amountAnime = 10;
const getAllRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const anime = yield prisma_1.prisma.anime.findMany({
        where: {
            anime_user_rank: {
                // find all rank anime that have user_id = req.session.userID
                some: {
                    user_id: req.session.userID,
                },
            },
        },
        include: {
            anime_user_rank: true,
        },
    });
    if (anime === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const animeRankDto = {
        all_rank: anime.map((a) => a.anime_user_rank.map((r) => r.rank)).flat(),
    };
    res.status(200).json(animeRankDto);
});
exports.getAllRank = getAllRank;
const getRankAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rank = req.params.rank;
    const anime = yield prisma_1.prisma.anime.findMany({
        where: {
            anime_user_rank: {
                // find all anime that have rank = rank and user_id = req.session.userID
                some: {
                    user_id: req.session.userID,
                    rank: rank,
                },
            },
        },
    });
    if (anime === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const animeRankDto = {
        anime: anime.map((a) => ({
            id: a.id,
            name: a.name,
            anime_pic: a.anime_pic,
        })),
    };
    res.status(200).json(animeRankDto);
});
exports.getRankAnime = getRankAnime;
const getRankAnimeWithLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rank = req.params.rank;
    const anime = yield prisma_1.prisma.anime.findMany({
        where: {
            anime_user_rank: {
                // find all anime that have rank = rank and user_id = req.session.userID
                some: {
                    user_id: req.session.userID,
                    rank: rank,
                },
            },
        },
        take: amountAnime,
    });
    if (anime === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const animeRankDto = {
        anime: anime.map((a) => ({
            id: a.id,
            name: a.name,
            anime_pic: a.anime_pic,
        })),
    };
    res.status(200).json(animeRankDto);
});
exports.getRankAnimeWithLimit = getRankAnimeWithLimit;
const getPlannedAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const anime = yield prisma_1.prisma.anime.findMany({
        where: {
            anime_user_planned: {
                // find all anime that have rank = rank and user_id = req.session.userID
                some: {
                    user_id: req.session.userID,
                    isPlanned: true,
                },
            },
        },
    });
    if (anime === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const animePlannedDto = {
        anime: anime.map((a) => ({
            id: a.id,
            name: a.name,
            anime_pic: a.anime_pic,
        })),
    };
    res.status(200).json(animePlannedDto);
});
exports.getPlannedAnime = getPlannedAnime;
const getAllAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const anime = yield prisma_1.prisma.anime.findMany();
    if (anime === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const animeRankDto = {
        anime: anime.map((a) => ({
            id: a.id,
            name: a.name,
            anime_pic: a.anime_pic,
        })),
    };
    res.status(200).json(animeRankDto);
});
exports.getAllAnime = getAllAnime;
const getAnimeByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const anime = yield prisma_1.prisma.anime.findUnique({
        where: {
            id,
        },
    });
    if (anime === null) {
        res.status(404).send({ message: "not found" });
        return;
    }
    const animeDto = {
        id: anime.id,
        name: anime.name,
        anime_pic: anime.anime_pic,
    };
    res.status(200).json(animeDto);
});
exports.getAnimeByID = getAnimeByID;
