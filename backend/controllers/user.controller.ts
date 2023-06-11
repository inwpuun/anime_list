import { prisma } from "../common/prisma"
import { Request, Response } from "express"
import { loginSchema, userSchema } from "../common/UserValidator"
import bcrypt from "bcrypt"
import { CreateUser, SessionDTO } from "../dto/user.dto"
import { Prisma } from "@prisma/client"

const createUser = async (req: Request, res: Response) => {
  const user: CreateUser = req.body
  const result = userSchema.safeParse(user)
  console.log(user)
  if (result.success) {
    const hashpassword = await bcrypt.hash(result.data.password, 10)
    try {
      const newUser = await prisma.user.create({
        data: {
          username: result.data.username,
          password: hashpassword,
          name: result.data.name,
          user_pic: result.data.user_pic,
        },
      })
      res.status(200).json({ message: "sign up successful" })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          res.status(400).json({
            message:
              "There is a unique constraint violation, a new user cannot be created with this email",
          })
        }
      }
      // throw e;
    }
  } else {
    res.status(400).json(result.error)
  }
}

const userLogin = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body)
  if (result.success) {
    const username = result.data.username
    const user = await prisma.user.findUnique({
      where: { username },
    })
    if (user == null) {
      res.status(400).json({
        message: "Account With this Username doesn't exist",
      })
      return
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isPasswordValid) {
      res.status(401).json({
        message: "Your username or password might be wrong!!",
      })
      return
    }
    req.session.userID = user.id
    req.session.username = username
    res.status(200).json({ message: "login successful" })
  } else {
    res.status(400).json(result.error)
  }
}

const logout = async (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.status(200).json({ message: "logout successful" })
  })
}

const getProfile = async (req: Request, res: Response) => {
  const session = req.session
  if (session.userID == undefined || session.username == undefined) {
    req.session.userID = -1
    req.session.username = ""
    console.log("create session successfully!")
    res.status(401).json({ message: "user doesn't log in.." })
    return
  } else if (session.username === "") {
    res.status(401).json({ message: "user doesn't log in..." })
    return
  } else {
    const userSession: SessionDTO = {
      userID: session.userID,
      username: session.username,
    }
    res.status(200).json(userSession)
  }
}

const enrollAnime = async (req: Request, res: Response) => {
  const animeid = parseInt(req.params.id as string)
  if (Number.isNaN(animeid)) {
    res.status(400).json({ message: "Invalid ID" })
    return
  }
  try {
    const session = req.session
    console.log(session)

    if (session.username == "") {
      res.status(401).json({
        message: "User need to login before enroll anime.",
      })
      return
    }
    const anime = await prisma.anime.findUnique({
      where: { id: animeid },
      include: { users: true },
    })
    if (anime == null) {
      res.status(400).json({ message: "anime not found" })
      return
    }
    if (anime.users.find((v) => v.username == session.username) !== undefined) {
      res.status(400).json({ message: "user already in anime" })
      return
    }
    const updateAnime = await prisma.anime.update({
      where: { id: animeid },
      data: {
        amount: { increment: 1 },
        users: { connect: { username: session.username } },
      },
    })
    res.status(200).json({ message: "join anime successful" })
  } catch (error) {
    // res.status(400).json({ message: "something went wrong" });
    console.log(error)

    res.status(400).send(error)
  }
}

export { createUser, userLogin, logout, getProfile, enrollAnime }
