import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import session, { Session, SessionData } from "express-session"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"
import { prisma } from "./common/prisma"
import { animeRouter } from "./routes/anime.route"
import { userRouter } from "./routes/user.route"
import cors from "cors"
import fileUpload from "express-fileupload"

declare module "express-session" {
  interface SessionData {
    userID: number
    username: string
  }
}

declare namespace Express {
  interface Request {
    session: Session & Partial<SessionData>
  }
}
dotenv.config()

const app: Express = express()
const port = process.env.PORT

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:5173",
  allowedHeaders:
    "Origin, Content-Type, Accept, Authorization, X-Request-With, Access-Control-Allow-Origin, X-Custom-Header",
  optionsSuccessStatus: 200,
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
}

app.use(cors(corsOptions))
// app.use(cors({ origin: "http://localhost:5173" }))

// app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.set("trust proxy", 1) // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: "none" },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
)

app.use("/anime", animeRouter)
app.use("/user", userRouter)
app.get("/", () => {
  console.log("server connect")
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
  console.log("server connect")
})
