import { Router } from "express";

import {verify_user, create_user} from "../controller/user_controller.js"



const User_router = Router()

Router.get("/login", verify_user )

// he should be able to create question and edit ( in future first foucs on User )
// Router.get("/create", create_user )

export {User_router}