import { generateGroqStream } from "./src/lib/ai/groq.ts";
import { generateGeminiStream } from "./src/lib/ai/gemini.ts";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  const messages = [
    { role: "assistant", content: "Hello! I am your CodeVerse AI Study Assistant." },
    { role: "user", content: "What is this page?" }
  ];
  
  try {
    console.log("Testing Groq...");
    await generateGroqStream(messages, "You are a tutor.");
    console.log("Groq Success!");
  } catch (e) {
    console.error("Groq Error:", e.message);
  }

  try {
    console.log("Testing Gemini...");
    await generateGeminiStream(messages, "You are a tutor.");
    console.log("Gemini Success!");
  } catch (e) {
    console.error("Gemini Error:", e.message);
  }
}

run();
