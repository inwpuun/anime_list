import { prisma } from "../common/prisma"
import { Request, Response } from "express"
import {
  CreateAnimeDto,
  CreateAnimeRankDto,
  CreateAnimePlannedDto,
  UpdateAnimeDto,
  UpdateAnimeRankDto,
  UpdateAnimePlannedDto,
} from "../dto/anime.dto"
import {
  animeSchema,
  animeRankSchema,
  animeUserPlannedSchema,
} from "../common/animeValidator"

const createAnime = async (req: Request, res: Response) => {
  const anime: CreateAnimeDto = req.body
  const check = animeSchema.safeParse(anime)
  if (check.success) {
    try {
      const result = await prisma.anime.create({
        data: {
          name: anime.name,
          category: anime.category,
          description: anime.description,
          anime_pic: anime.anime_pic,
          avg_rank: 0,
        },
      })

      console.log(result)

      res.status(201).json(result)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "something wents wrong" })
    }
  } else {
    console.log(check.error)
    res.status(400).json({ message: "parsing error" })
  }
}

const createAnimeRank = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id) //anime id
  if (isNaN(id)) {
    res.status(404).send({ message: "invalid ID" })
    return
  }

  const animeRank: CreateAnimeRankDto = req.body
  const check = animeRankSchema.safeParse(animeRank)
  if (check.success) {
    const anime = await prisma.anime.findUnique({
      where: { id },
      include: {
        users: true,
      },
    })

    if (anime == null) {
      res.status(404).send({ message: "anime not found" })
      return
    }

    if (req.session.userID == null) {
      res.status(401).send({ message: "unauthorized" })
      return
    }

    try {
      const result = await prisma.anime_user_rank.create({
        data: {
          anime_id: anime.id,
          user_id: req.session.userID,
          rank: animeRank.rank,
        },
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "something wents wrong" })
    }
  } else {
    res.status(400).json({ message: "something went wrong" })
  }
}

const createAnimePlanned = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id) //anime id
  if (isNaN(id)) {
    res.status(404).send({ message: "invalid ID" })
    return
  }

  const animePlanned: CreateAnimePlannedDto = req.body
  const check = animeUserPlannedSchema.safeParse(animePlanned)
  if (check.success) {
    const anime = await prisma.anime.findUnique({
      where: { id },
      include: {
        users: true,
      },
    })

    if (anime == null) {
      res.status(404).send({ message: "anime not found" })
      return
    }

    if (req.session.userID == null) {
      res.status(401).send({ message: "unauthorized" })
      return
    }

    try {
      const result = await prisma.anime_user_planned.create({
        data: {
          anime_id: anime.id,
          user_id: req.session.userID,
          isPlanned: animePlanned.isPlanned,
        },
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "something wents wrong" })
    }
  } else {
    res.status(400).json({ message: "something went wrong" })
  }
}

const updateAnime = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(404).send({ message: "invalid ID" })
    return
  }
  const newAnimeDto: UpdateAnimeDto = req.body
  const check = animeSchema.safeParse(newAnimeDto)

  if (check.success) {
    const anime = await prisma.anime.update({
      where: { id },
      data: check.data,
    })
    res.status(200).json(anime)
  } else {
    res.status(400).json({ message: "something went wrong" })
  }
}

const updateAnimeRank = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(404).send({ message: "invalid ID" })
    return
  }
  const newAnimeRankDto: UpdateAnimeRankDto = req.body
  const check = animeSchema.safeParse(newAnimeRankDto)

  if (check.success) {
    const anime = await prisma.anime.update({
      where: { id },
      data: check.data,
    })
    res.status(200).json(anime)
  } else {
    res.status(400).json({ message: "something went wrong" })
  }
}

const updateAnimePlanned = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(404).send({ message: "invalid ID" })
    return
  }
  const newAnimePlannedDto: UpdateAnimePlannedDto = req.body
  const check = animeSchema.safeParse(newAnimePlannedDto)

  if (check.success) {
    const anime = await prisma.anime.update({
      where: { id },
      data: check.data,
    })
    res.status(200).json(anime)
  } else {
    res.status(400).json({ message: "something went wrong" })
  }
}

const deleteAnime = async (req: Request, res: Response) => {
  const id = req.params.id
  await prisma.anime.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(204).send()
}

const deleteAnimeRank = async (req: Request, res: Response) => {
  const id = req.params.id
  await prisma.anime_user_rank.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(204).send()
}

const deleteAnimePlanned = async (req: Request, res: Response) => {
  const id = req.params.id
  await prisma.anime_user_planned.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(204).send()
}

export {
  createAnime,
  createAnimeRank,
  createAnimePlanned,
  updateAnime,
  updateAnimeRank,
  updateAnimePlanned,
  deleteAnime,
  deleteAnimeRank,
  deleteAnimePlanned,
}
