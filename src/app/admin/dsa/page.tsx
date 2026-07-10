import { prisma } from "@/lib/prisma";
import DSACMSClient from "./DSACMSClient";

export const metadata = {
  title: "DSA CMS | Admin",
};

export default async function AdminDSAPage() {
  const topics = await prisma.dSATopic.findMany({
    include: {
      problems: true,
    },
    orderBy: { order: "asc" }
  });

  return <DSACMSClient initialTopics={topics} />;
}
