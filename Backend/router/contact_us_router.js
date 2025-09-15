import { Router } from "express";
import {contact_us_function} from "../controller/contact_us_controller.js";
import is_valid_user from "../middlewares/Auth_middlewares.js";
import fs from "fs"

const contact_router = Router()

import multer from "multer"


const storage = multer.memoryStorage()
// Files are stored in RAM.
// Each uploaded file is available as req.file.buffer.

const upload = multer({storage,
    limits : {fieldSize : 1024*5*1024} //5MB
})



contact_router.post("/" , upload.single("attachment") ,contact_us_function)
// contact_router.post("/", is_valid_user ,contact_us_function)


export { contact_router }