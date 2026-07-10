"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPlanner(title: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false };

  try {
    const planner = await prisma.studyPlanner.create({
      data: {
        userId: session.user.id,
        title,
      },
      include: { tasks: true }
    });
    revalidatePath("/planner");
    return { success: true, planner };
  } catch (error) {
    return { success: false, error };
  }
}

export async function createTask(plannerId: string, title: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false };

  try {
    const task = await prisma.studyTask.create({
      data: {
        plannerId,
        title,
      }
    });
    revalidatePath("/planner");
    return { success: true, task };
  } catch (error) {
    return { success: false, error };
  }
}

export async function toggleTaskStatus(taskId: string, status: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false };

  try {
    await prisma.studyTask.update({
      where: { id: taskId },
      data: { status }
    });
    revalidatePath("/planner");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function deleteTask(taskId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false };

  try {
    await prisma.studyTask.delete({
      where: { id: taskId }
    });
    revalidatePath("/planner");
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
