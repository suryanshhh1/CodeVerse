import { GoogleGenAI } from "@google/genai";
import { AIMessage } from "./index";

export async function generateGeminiStream(messages: AIMessage[], systemInstruction: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key not configured");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Format messages for Gemini API
  const formattedMessages = messages.map((msg: AIMessage) => {
    const parts: any[] = [{ text: msg.content }];
    
    if (msg.attachments && Array.isArray(msg.attachments)) {
      msg.attachments.forEach((att: any) => {
        if (att.url && att.url.startsWith("data:")) {
          const match = att.url.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*?,(.*)$/);
          if (match) {
            const mimeType = match[1];
            const base64Data = match[2];
            parts.push({
              inlineData: {
                mimeType,
                data: base64Data
              }
            });
          }
        }
      });
    }

    return {
      role: (msg.role === "assistant" || msg.role === "model") ? "model" : "user",
      parts,
    };
  });

  const stream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: formattedMessages,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  // Convert the Gemini AsyncGenerator into a standard Web ReadableStream
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.text) {
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(chunk.text));
          }
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    }
  });
}
