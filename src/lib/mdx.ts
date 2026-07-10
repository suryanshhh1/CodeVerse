import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'src', 'content');

export async function getMdxContent(type: 'notes' | 'languages', slug: string) {
  const filePath = path.join(CONTENT_PATH, type, `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return { frontmatter: data, content };
  } catch (error) {
    console.error(`Error reading MDX file for ${type}/${slug}:`, error);
    return null;
  }
}

export async function getAllMdxSlugs(type: 'notes' | 'languages') {
  const dirPath = path.join(CONTENT_PATH, type);
  try {
    const files = fs.readdirSync(dirPath);
    return files.filter(f => f.endsWith('.mdx')).map(f => f.replace('.mdx', ''));
  } catch (error) {
    console.error(`Error reading MDX directory for ${type}:`, error);
    return [];
  }
}
