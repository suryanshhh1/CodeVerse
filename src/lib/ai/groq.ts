import Groq from "groq-sdk";

export async function generateGroqStream(messages: any[], systemInstruction: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Groq API key not configured");
  }

  const groq = new Groq({ apiKey });

  let hasAttachments = false;

  const formattedMessages = messages.map((msg: any) => {
    let content: any = msg.content;
    
    if (msg.attachments && Array.isArray(msg.attachments) && msg.attachments.length > 0) {
      hasAttachments = true;
      content = [{ type: "text", text: msg.content }];
      
      msg.attachments.forEach((att: any) => {
        if (att.url && att.url.startsWith("data:")) {
          content.push({
            type: "image_url",
            image_url: {
              url: att.url
            }
          });
        }
      });
    }

    return {
      role: (msg.role === "assistant" || msg.role === "model") ? "assistant" : "user",
      content,
    };
  });

  // Prepend system instruction
  formattedMessages.unshift({
    role: "system",
    content: systemInstruction
  });

  // Use vision model if there are image attachments, otherwise standard fast model
  const model = hasAttachments ? "llama-3.2-90b-vision-preview" : "llama-3.3-70b-versatile";

  const stream = await groq.chat.completions.create({
    model,
    messages: formattedMessages as any,
    temperature: 0.7,
    stream: true,
  });

  // Convert Groq stream to Web ReadableStream
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            const encoder = new TextEncoder();
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    }
  });
}
