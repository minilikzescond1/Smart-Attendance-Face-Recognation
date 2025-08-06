import type { Request, Response, NextFunction } from "express"

// Validate login input
export const validateLoginInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" })
  }

  next()
}

// Validate registration input
export const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" })
  }

  // Password strength validation
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" })
  }

  // Role validation if provided
  if (role && !["ADMIN", "USER"].includes(role)) {
    return res.status(400).json({ message: "Role must be either ADMIN or USER" })
  }

  next()
}
