import { prisma } from "../common/prisma"
import { Request, Response } from "express"
import { MyAnimeDto, AllRankDto, PartAnimeDto } from "../dto/common.dto"

const amountAnime = 10

const getAllRank = async (req: Request, res: Response) => {
  const anime = await prisma.anime.findMany({
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
  })

  if (anime === null) {
    res.status(404).send({ message: "not found" })
    return
  }

  const animeRankDto: AllRankDto = {
    all_rank: anime.map((a) => a.anime_user_rank.map((r) => r.rank)).flat(),
  }

  res.status(200).json(animeRankDto)
}

const getRankAnime = async (req: Request, res: Response) => {
  const rank = req.params.rank

  const anime = await prisma.anime.findMany({
    where: {
      anime_user_rank: {
        // find all anime that have rank = rank and user_id = req.session.userID
        some: {
          user_id: req.session.userID,
          rank: rank,
        },
      },
    },
  })

  if (anime === null) {
    res.status(404).send({ message: "not found" })
    return
  }

  const animeRankDto: MyAnimeDto = {
    anime: anime.map((a) => ({
      id: a.id,
      name: a.name,
      anime_pic: a.anime_pic,
    })),
  }

  res.status(200).json(animeRankDto)
}

const getRankAnimeWithLimit = async (req: Request, res: Response) => {
  const rank = req.params.rank

  const anime = await prisma.anime.findMany({
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
  })

  if (anime === null) {
    res.status(404).send({ message: "not found" })
    return
  }

  const animeRankDto: MyAnimeDto = {
    anime: anime.map((a) => ({
      id: a.id,
      name: a.name,
      anime_pic: a.anime_pic,
    })),
  }

  res.status(200).json(animeRankDto)
}

const getPlannedAnime = async (req: Request, res: Response) => {
  const anime = await prisma.anime.findMany({
    where: {
      anime_user_planned: {
        // find all anime that have rank = rank and user_id = req.session.userID
        some: {
          user_id: req.session.userID,
          isPlanned: true,
        },
      },
    },
  })

  if (anime === null) {
    res.status(404).send({ message: "not found" })
    return
  }

  const animePlannedDto: MyAnimeDto = {
    anime: anime.map((a) => ({
      id: a.id,
      name: a.name,
      anime_pic: a.anime_pic,
    })),
  }

  res.status(200).json(animePlannedDto)
}

const getAllAnime = async (req: Request, res: Response) => {
  const anime = await prisma.anime.findMany()

  if (anime === null) {
    res.status(404).send({ message: "not found" })
    return
  }

  const animeRankDto: MyAnimeDto = {
    anime: anime.map((a) => ({
      id: a.id,
      name: a.name,
      anime_pic: a.anime_pic,
    })),
  }

  res.status(200).json(animeRankDto)
}

const getAnimeByID = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const anime = await prisma.anime.findUnique({
    where: {
      id,
    },
  })

  if (anime === null) {
    res.status(404).send({ message: "not found" })
    return
  }

  const animeDto: PartAnimeDto = {
    id: anime.id,
    name: anime.name,
    anime_pic: anime.anime_pic,
  }

  res.status(200).json(animeDto)
}

export {
  getAllRank,
  getRankAnime,
  getRankAnimeWithLimit,
  getPlannedAnime,
  getAllAnime,
  getAnimeByID,
}
