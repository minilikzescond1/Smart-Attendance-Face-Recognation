import { Router } from "express"
import { login, register } from "../controllers/auth.controller"
import { validateLoginInput, validateRegisterInput } from "../middleware/validation.middleware"

const router = Router()

// Auth routes
router.post("/register", validateRegisterInput, register)
router.post("/login", validateLoginInput, login)

export default router
