
import {get_all_the_question_data, get_all_the_topic_data, update_question_status, upvote_particular_topic_by_user, get_leaderboard_topics_vote, upload_question_data, get_questions_status } from "../controller/questions_controller.js"
import { Router } from "express"

import is_valid_user, {is_admin} from "../middlewares/Auth_middlewares.js"


const specific_topic_questions_router = Router()


specific_topic_questions_router.get("/topics",get_all_the_topic_data); // to get data of all the topic available so that users can get questions for that specific topic (eg : java,python, dsa.. etc)

specific_topic_questions_router.get("/collections/:topic_name",get_all_the_question_data); //all questions for specific topic eg: all python questions


// i was confused between PATCH & POST  but post is closer to this
specific_topic_questions_router.post("/status", is_valid_user , update_question_status); // first validate your and then only update the questions status
specific_topic_questions_router.get("/status", is_valid_user , get_questions_status); // first validate your and then only update the questions status

specific_topic_questions_router.post("/topic/upvote", is_valid_user , upvote_particular_topic_by_user);


specific_topic_questions_router.get("/topic/dashboard/vote",get_leaderboard_topics_vote)


specific_topic_questions_router.post("/upload", is_admin ,upload_question_data)

export {specific_topic_questions_router}

