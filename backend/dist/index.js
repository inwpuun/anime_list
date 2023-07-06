"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const prisma_1 = require("./common/prisma");
const anime_route_1 = require("./routes/anime.route");
const user_route_1 = require("./routes/user.route");
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const corsOptions = {
    origin: "http://localhost:5173",
    allowedHeaders: "Origin, Content-Type, Accept, Authorization, X-Request-With, Access-Control-Allow-Origin, X-Custom-Header",
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
};
app.use((0, cors_1.default)(corsOptions));
// app.use(cors({ origin: "http://localhost:5173" }))
// app.use(cors())
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.set("trust proxy", 1); // trust first proxy
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, sameSite: "none" },
    store: new prisma_session_store_1.PrismaSessionStore(prisma_1.prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
    }),
}));
app.use("/anime", anime_route_1.animeRouter);
app.use("/user", user_route_1.userRouter);
app.get("/", () => {
    console.log("server connect");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    console.log("server connect");
});
