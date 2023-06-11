import { Router } from "express"
import {
  createAnime,
  createAnimeRank,
  createAnimePlanned,
  updateAnime,
  updateAnimeRank,
  updateAnimePlanned,
  deleteAnime,
  deleteAnimeRank,
  deleteAnimePlanned,
} from "../controllers/myAnimeCUD.controller"
import {
  getAllRank,
  getRankAnime,
  getRankAnimeWithLimit,
  getPlannedAnime,
  getAllAnime,
  getAnimeByID,
} from "../controllers/myAnimeR.controller"

export const animeRouter = Router()

animeRouter.get("/getAllRank", getAllRank)
animeRouter.get("/getRankAnime/:rank", getRankAnime)
animeRouter.get("/getRankAnimeWithLimit/:rank", getRankAnimeWithLimit)
animeRouter.get("/getPlannedAnime", getPlannedAnime)
animeRouter.get("/getAllAnime", getAllAnime)
animeRouter.get("/getAnimeByID/:id", getAnimeByID)

animeRouter.post("/createAnime/", createAnime)
animeRouter.post("/createAnimeRank/", createAnimeRank)
animeRouter.post("/createAnimePlanned/", createAnimePlanned)

animeRouter.patch("/updateAnime/:id", updateAnime)
animeRouter.patch("/updateAnimeRank/:id", updateAnimeRank)
animeRouter.patch("/updateAnimePlanned/:id", updateAnimePlanned)

animeRouter.delete("/deleteAnime/:id", deleteAnime)
animeRouter.delete("/deleteAnimeRank/:id", deleteAnimeRank)
animeRouter.delete("/deleteAnimePlanned/:id", deleteAnimePlanned)
