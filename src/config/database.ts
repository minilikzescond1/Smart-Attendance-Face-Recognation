import { PrismaClient } from "@prisma/client"

// Initialize Prisma client
const prisma = new PrismaClient()

// Test database connection
export const testConnection = async () => {
  try {
    await prisma.$connect()
    console.log("Database connection established successfully")
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

export default prisma
