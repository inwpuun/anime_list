import { Router } from "express"
import { getActiveUserDto } from "../controllers/activeUser.controller"

import {
  createUser,
  userLogin,
  logout,
  getProfile,
  enrollAnime,
} from "../controllers/user.controller"

export const userRouter = Router()
userRouter.post("/userRegister", createUser)
userRouter.post("/userLogin", userLogin)
userRouter.post("/enrollAnime/:id", enrollAnime)
userRouter.get("/logout", logout)
userRouter.get("/me", getProfile)
userRouter.get("/getActiveUserDto/", getActiveUserDto)
