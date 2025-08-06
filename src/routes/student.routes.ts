import { Router } from "express"
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller"
import { authenticate } from "../middleware/auth.middleware"

const router = Router()

// Apply authentication middleware to all student routes
router.use(authenticate)

// Student routes
router.get("/", getAllStudents)
router.get("/:id", getStudentById)
router.post("/", createStudent)
router.put("/:id", updateStudent)
router.delete("/:id", deleteStudent)

export default router
