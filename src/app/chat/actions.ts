"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getConversations() {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: { attachments: true }
        }
      }
    });

    if (conversations.length === 0) {
      // If there are no conversations, automatically create a new empty conversation
      const newConv = await prisma.conversation.create({
        data: {
          userId: session.user.id,
          title: "New Conversation",
        },
        include: { 
          messages: {
            include: { attachments: true }
          } 
        }
      });
      return [newConv];
    }

    return conversations;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return []; // Return empty state on failure
  }
}

export async function createConversation(title: string, contextUrl?: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const conversation = await prisma.conversation.create({
      data: {
        userId: session.user.id,
        title,
        contextUrl
      },
      include: { 
        messages: {
          include: { attachments: true }
        } 
      }
    });
    
    revalidatePath("/chat");
    return conversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Failed to create conversation");
  }
}

export async function saveMessage(conversationId: string, role: "user" | "model" | "assistant", content: string, attachments?: { type: string, url: string, name: string }[]) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    // Update conversation updatedAt timestamp as well
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });

    return await prisma.message.create({
      data: {
        conversationId,
        role: role === "model" ? "assistant" : role, // standardize on assistant or user
        content,
        attachments: attachments && attachments.length > 0 ? {
          create: attachments.map(att => ({
            type: att.type,
            url: att.url,
            name: att.name
          }))
        } : undefined
      },
      include: {
        attachments: true
      }
    });
  } catch (error) {
    console.error("Error saving message:", error);
    // don't crash, just log
    return null;
  }
}

export async function deleteConversation(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await prisma.conversation.delete({
      where: { id, userId: session.user.id }
    });

    revalidatePath("/chat");
    return { success: true };
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return { success: false };
  }
}

export async function renameConversation(id: string, newTitle: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await prisma.conversation.update({
      where: { id, userId: session.user.id },
      data: { title: newTitle }
    });

    revalidatePath("/chat");
    return { success: true };
  } catch (error) {
    console.error("Error renaming conversation:", error);
    return { success: false };
  }
}

export async function togglePin(id: string, isPinned: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await prisma.conversation.update({
      where: { id, userId: session.user.id },
      data: { isPinned }
    });

    revalidatePath("/chat");
    return { success: true };
  } catch (error) {
    console.error("Error toggling pin:", error);
    return { success: false };
  }
}

export async function toggleFavorite(id: string, isFavorite: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await prisma.conversation.update({
      where: { id, userId: session.user.id },
      data: { isFavorite }
    });

    revalidatePath("/chat");
    return { success: true };
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { success: false };
  }
}
