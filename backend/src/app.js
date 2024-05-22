import express, { json, urlencoded } from "express"
const app = express()
import cookieParser from "cookie-parser"
import cors from 'cors'


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(json({limit: "16kb"}))
app.use(urlencoded({extended:true, limit: "16kb"}))
app.use(cookieParser())
app.use(express.static("public"))


// router imports
import userRouter from "./routers/user.routes.js"
import p5Router from "./routers/p5.routes.js"
import rewardRouter from "./routers/reward.routes.js"

//routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/p5", p5Router)
app.use("/api/v1/reward", rewardRouter)






export default app