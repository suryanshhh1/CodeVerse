import { generateGroqStream } from "./groq";
import { generateGeminiStream } from "./gemini";

export interface AIMessage {
  role: string;
  content: string;
  attachments?: { url: string; name?: string }[];
}

export async function generateAIResponse(messages: AIMessage[], pageContext?: string) {
  let systemInstruction = "You are the CodeVerse AI Study Assistant. You are a helpful, brilliant computer science tutor. You explain concepts clearly, provide code snippets when helpful, and guide the user in learning programming and computer science. Always format your code snippets with markdown and include the language name.";

  if (pageContext) {
    systemInstruction += `\n\nCRITICAL CONTEXT: The user is currently viewing the page/topic: "${pageContext}". When the user says "this", "explain this", "generate a quiz", "give me questions", or asks for examples, you MUST assume they are talking about ${pageContext}. Do not ask for clarification about what topic they mean. Provide examples, quizzes, and explanations tailored explicitly to ${pageContext}.`;
  }

  let stream: ReadableStream | null = null;
  let providerName = "groq";

  console.log("[AI] Provider selected: Groq");

  try {
    // Attempt primary provider
    stream = await generateGroqStream(messages, systemInstruction);
    console.log("[AI] Status: Success");
  } catch (groqError: any) {
    console.error("[AI] Provider Error: Groq failed:", groqError.message || String(groqError));
    console.log("[AI] Provider failed → Switching to Gemini...");
    
    providerName = "gemini";
    try {
      // Attempt fallback provider
      stream = await generateGeminiStream(messages, systemInstruction);
      console.log("[AI] Status: Success (Fallback)");
    } catch (geminiError: any) {
      console.error("[AI] Provider Error: Gemini (Fallback) failed:", geminiError.message || String(geminiError));
      
      // Both providers failed
      throw new Error("Sorry, the AI assistant is temporarily unavailable. Please try again in a few moments.");
    }
  }

  return { stream, providerName };
}
