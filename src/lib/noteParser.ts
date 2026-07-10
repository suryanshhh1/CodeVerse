import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'src', 'content');

function extractSection(content: string, header: string): string | null {
  const regex = new RegExp(`## ${header}\\n([\\s\\S]*?)(?=\\n## |$)`);
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function extractList(content: string, header: string): string[] {
  const text = extractSection(content, header);
  if (!text) return [];
  return text.split('\\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^-\\s*(.*\\S)\\s*$/, '$1').trim());
}

function extractCode(content: string, header: string): string | null {
  const text = extractSection(content, header);
  if (!text) return null;
  // Remove markdown code fences
  return text.replace(/^\\s*\\`\\`\\`[a-z]*\\n/, '').replace(/\\n\\`\\`\\`\\s*$/, '').trim();
}

function extractInterviewQuestions(content: string): string[] {
  const text = extractSection(content, 'Interview Questions');
  if (!text) return [];
  // Match lines like "1. **Question?**" or "1. Question?"
  return text.split('\\n')
    .filter(line => /^\\d+\\./.test(line.trim()))
    .map(line => {
      // Remove "1. " and "**"
      let q = line.replace(/^\\d+\\.\\s*/, '').trim();
      q = q.replace(/\\*\\*/g, '');
      return q;
    });
}

export async function getNoteData(slug: string) {
  const filePath = path.join(CONTENT_PATH, 'notes', `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      id: slug, // Using slug as ID for compatibility if needed, though DB provides real ID
      title: data.title || '',
      category: data.category || '',
      readTime: data.readTime || 5,
      overview: extractSection(content, 'Overview') || '',
      definition: extractSection(content, 'Definition') || '',
      simpleExplanation: extractSection(content, 'Beginner Explanation') || '',
      realWorldExample: extractSection(content, 'Real World Example') || '',
      syntax: extractCode(content, 'Syntax'),
      codeExample: extractCode(content, 'Code Example'),
      bestPractices: extractList(content, 'Best Practices'),
      commonMistakes: extractList(content, 'Common Mistakes'),
      interviewQuestions: extractInterviewQuestions(content),
      quickRevision: extractSection(content, 'Quick Revision') || '',
    };
  } catch (error) {
    console.error(`Error reading MDX file for notes/${slug}:`, error);
    return null;
  }
}
