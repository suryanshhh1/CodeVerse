import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      console.error("Zod Validation Error:", result.error);
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error("Signup Error: User already exists");
      return NextResponse.json({ message: "User already exists with this email" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        profile: {
          create: {
            bio: "",
            learningGoal: "Master Computer Science",
          }
        },
        learningStats: {
          create: {
            totalStudyTimeMs: 0,
            completedTopics: 0,
            completedRoadmaps: 0,
            averageQuizScore: 0,
          }
        },
        learningStreak: {
          create: {
            currentStreak: 0,
            longestStreak: 0,
          }
        }
      },
    });

    console.log("Successfully created user:", user.email);
    return NextResponse.json({ message: "User created successfully", userId: user.id }, { status: 201 });
  } catch (error: any) {
    console.error("Detailed 500 Signup Error:", error);
    return NextResponse.json({ message: error.message || "Internal server error", stack: error.stack }, { status: 500 });
  }
}
