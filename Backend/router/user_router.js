import { Router } from "express";

import { verify_user, create_user, check_auth, log_user_out} from "../controller/user_controller.js"

// The router does not contain business logic, database queries, or response shaping — it just forwards requests.

const User_router = Router()

User_router.post("/login", verify_user )
User_router.post("/signin", create_user )
User_router.post("/logout", log_user_out )
User_router.get("/auth/check", check_auth )

export {User_router}