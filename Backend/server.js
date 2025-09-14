import express from "express";
import dotenv from "dotenv"
import Error_Handler from "./middlewares/Error_Handling_middlewares.js";
import { User_router } from "./router/user_router.js";
import cookieParse from "cookie-parser"
import cors from "cors"
import is_valid_user from "./middlewares/Auth_middlewares.js";

import {specific_topic_questions_router} from "./router/questions_router.js"
import {interviewRouter} from "./router/interview_router.js"

const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()


app.use(express.json()) 
app.use(cookieParse())
app.use(cors({
    origin: "http://localhost:5173", // react frontend
    credentials: true, // allow cookies to be sent
  }));


app.use("/api/questions",specific_topic_questions_router)

// as getting question doesnt require middleware so placing this middleware below topic_questions router

// app.use(is_valid_user) 
app.use("/api/user" , User_router)

app.use("/api/interview" , interviewRouter)

// app.post("/api/admin" , User_router)





// error Handling Middle ware
app.use(Error_Handler)



app.listen(PORT,()=>{
    console.log(`Server is listening to ${PORT} port`)
} )


