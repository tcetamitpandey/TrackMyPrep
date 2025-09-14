import { Router } from "express";

import {post_ai_interview_answer, get_ai_questions} from "../controller/interview_controller.js"

import {is_paid_user} from "../middlewares/Auth_middlewares.js"
import is_valid_user, {is_admin} from "../middlewares/Auth_middlewares.js"

const interviewRouter = Router()



// interviewRouter.get("/question",is_paid_user, get_ai_questions )
interviewRouter.post("/question", get_ai_questions )


// interviewRouter.post("/submit",is_paid_user, post_ai_interview_answer )
interviewRouter.post("/submit", is_valid_user, post_ai_interview_answer )



export {interviewRouter}