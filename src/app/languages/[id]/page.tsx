import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import LanguageClient from "./LanguageClient";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function LanguageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const language = await prisma.language.findUnique({
    where: { slug: resolvedParams.id }
  });

  if (!language) {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'src', 'content', 'languages', `${resolvedParams.id}.mdx`);
  let content = '';
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content: mdxContent } = matter(fileContent);
    content = mdxContent;
  } catch (e) {
    // If MDX doesn't exist, we will just render the description
  }

  return (
    <LanguageClient language={language} mdxContent={<MDXRemote source={content} />} />
  );
}
