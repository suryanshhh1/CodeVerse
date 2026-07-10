import { prisma } from "@/lib/prisma";
import LanguagesCMSClient from "./LanguagesCMSClient";

export const metadata = {
  title: "Languages CMS | Admin",
};

export default async function AdminLanguagesPage() {
  const languages = await prisma.language.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <LanguagesCMSClient initialLanguages={languages} />;
}
