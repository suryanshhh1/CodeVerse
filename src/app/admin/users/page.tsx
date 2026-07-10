import { prisma } from "@/lib/prisma";
import UsersClient from "./UsersClient";

export const metadata = {
  title: "User Management | Admin",
};

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      learningStats: true,
      learningStreak: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return <UsersClient initialUsers={users} />;
}
