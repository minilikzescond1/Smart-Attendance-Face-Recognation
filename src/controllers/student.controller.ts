import type { Request, Response } from "express"
import { prisma } from "../index"

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        courses: true,
      },
    })
    res.status(200).json(students)
  } catch (error) {
    console.error("Error fetching students:", error)
    res.status(500).json({ message: "Server error while fetching students" })
  }
}

// Get student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
      include: {
        courses: true,
      },
    })

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    res.status(200).json(student)
  } catch (error) {
    console.error("Error fetching student:", error)
    res.status(500).json({ message: "Server error while fetching student" })
  }
}

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, dateOfBirth, address, phoneNumber, courseIds } = req.body

    const student = await prisma.student.create({
      data: {
        name,
        email,
        dateOfBirth: new Date(dateOfBirth),
        address,
        phoneNumber,
        courses: {
          connect: courseIds?.map((id: number) => ({ id })) || [],
        },
      },
      include: {
        courses: true,
      },
    })

    res.status(201).json({
      message: "Student created successfully",
      student,
    })
  } catch (error) {
    console.error("Error creating student:", error)
    res.status(500).json({ message: "Server error while creating student" })
  }
}

// Update a student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, email, dateOfBirth, address, phoneNumber, courseIds } = req.body

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id: Number(id) },
    })

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" })
    }

    // Update student
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        address,
        phoneNumber,
        courses: courseIds
          ? {
              set: [],
              connect: courseIds.map((id: number) => ({ id })),
            }
          : undefined,
      },
      include: {
        courses: true,
      },
    })

    res.status(200).json({
      message: "Student updated successfully",
      student,
    })
  } catch (error) {
    console.error("Error updating student:", error)
    res.status(500).json({ message: "Server error while updating student" })
  }
}

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id: Number(id) },
    })

    if (!existingStudent) {
      return res.status(404).json({ message: "Student not found" })
    }

    // Delete student
    await prisma.student.delete({
      where: { id: Number(id) },
    })

    res.status(200).json({
      message: "Student deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting student:", error)
    res.status(500).json({ message: "Server error while deleting student" })
  }
}
