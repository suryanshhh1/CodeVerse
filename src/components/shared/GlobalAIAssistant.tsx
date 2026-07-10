"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, Sparkles, X, MessageCircle, ArrowRight, StopCircle, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter").then(mod => mod.Prism), {
  ssr: false,
  loading: () => <div className="w-full h-24 bg-muted/50 animate-pulse rounded-md my-2" />
});
import { createConversation, saveMessage } from "@/app/chat/actions";
import { toast } from "sonner";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// Helper function to extract readable context from pathname
const getContextFromPathname = (pathname: string) => {
  if (pathname.includes("/notes/java")) return "Java Notes";
  if (pathname.includes("/notes/python")) return "Python Notes";
  if (pathname.includes("/roadmaps/react")) return "React Roadmap";
  if (pathname.includes("/dsa/binary-search")) return "Binary Search";
  if (pathname.includes("/dsa")) return "Data Structures and Algorithms (DSA)";
  if (pathname.includes("/notes/dbms")) return "Database Management Systems (DBMS)";
  if (pathname.includes("/notes/os")) return "Operating Systems";
  if (pathname.includes("/notes/cn")) return "Computer Networks";
  if (pathname.includes("/dashboard")) return "Student Dashboard";
  
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1].replace(/-/g, " ");
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  }
  return "General CodeVerse Platform";
};

export function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I am your CodeVerse AI Study Assistant. I automatically know what you're reading right now. How can I help?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const prompt = customPrompt || input;
    if (!prompt.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: prompt };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const pageContext = getContextFromPathname(pathname || "");
      
      // Ensure we have a DB conversation
      let activeConvId = conversationId;
      if (!activeConvId) {
        const title = prompt.slice(0, 30) + (prompt.length > 30 ? "..." : "");
        const conv = await createConversation(title, pageContext);
        activeConvId = conv.id;
        setConversationId(conv.id);
      }

      // Save user message
      await saveMessage(activeConvId, "user", prompt);

      abortControllerRef.current = new AbortController();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: newMessages,
          pageContext 
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        let errorMsg = "Failed to get response";
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errData = await response.json();
            if (errData.error) errorMsg = errData.error;
          } else {
            const textMsg = await response.text();
            if (textMsg) errorMsg = textMsg;
          }
        } catch (e) {}
        throw new Error(errorMsg);
      }
      
      const aiProvider = response.headers.get("x-ai-provider");
      if (aiProvider) {
        setProvider(aiProvider);
      }

      setIsTyping(false);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullReply = "";
      
      const botMsgId = "msg-" + crypto.randomUUID();
      setMessages((prev) => [...prev, { id: botMsgId, role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunkText = decoder.decode(value, { stream: true });
          fullReply = fullReply + chunkText;

          setMessages((prev) => prev.map(m => m.id === botMsgId ? { ...m, content: fullReply } : m));
        }
      }

      await saveMessage(activeConvId, "model", fullReply);

    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Chat error:", error);
        setIsTyping(false);
        const errorMsg: Message = { 
          id: "msg-" + crypto.randomUUID(), 
          role: "assistant", 
          content: `**Error:** ${error.message || "An unexpected error occurred."}` 
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTyping(false);
    }
  };

  const handleContinueInFullChat = () => {
    if (conversationId) {
      setIsOpen(false);
      router.push(`/chat?id=${conversationId}`);
    } else {
      setIsOpen(false);
      router.push(`/chat`);
    }
  };

  const suggestedQuestions = ["Explain this topic simpler", "Give me practice problems"];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[400px] h-[600px] max-h-[80vh] flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-border/50"
          >
            <Card className="flex-1 flex flex-col h-full bg-card/95 backdrop-blur-xl border-none">
              <CardHeader className="border-b border-border/50 bg-background/90 p-4 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex flex-col gap-1 text-lg">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    CodeVerse AI
                    {provider && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${provider === "groq" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"}`}>
                        Powered by {provider === "groq" ? "Groq 🟢" : "Gemini 🟡"}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-normal text-muted-foreground ml-7">
                    Context: {getContextFromPathname(pathname || "")}
                  </span>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 max-w-[90%] \${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full \${msg.role === "assistant" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground"}`}>
                        {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === "assistant" ? "bg-zinc-800 text-gray-100 rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm"}`}>
                        {msg.role === "assistant" ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({children}) => <p className="text-gray-100 mb-2 last:mb-0 leading-relaxed">{children}</p>,
                              strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
                              h1: ({children}) => <h1 className="text-white font-bold text-base mb-2">{children}</h1>,
                              h2: ({children}) => <h2 className="text-white font-bold text-sm mb-2">{children}</h2>,
                              h3: ({children}) => <h3 className="text-white font-semibold text-sm mb-1">{children}</h3>,
                              li: ({children}) => <li className="text-gray-100 ml-4 list-disc mb-1">{children}</li>,
                              a: ({children, href}) => <a href={href} className="text-primary underline" target="_blank" rel="noreferrer">{children}</a>,
                              code({node, inline, className, children, ...props}: any) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    {...props}
                                    style={dracula as any}
                                    language={match[1]}
                                    PreTag="div"
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code {...props} className="bg-zinc-700 text-green-300 px-1 py-0.5 rounded text-xs font-mono">
                                    {children}
                                  </code>
                                )
                              }
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        ) : (
                          msg.content
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[80%]">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-3 rounded-2xl bg-zinc-800 text-gray-100 rounded-tl-sm flex items-center gap-1 shadow-sm">
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce delay-75"></span>
                      <span className="h-2 w-2 bg-primary rounded-full animate-bounce delay-150"></span>
                    </div>
                  </motion.div>
                )}

                {!isTyping && messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {suggestedQuestions.map(q => (
                      <Badge key={q} onClick={() => handleSend(q)} className="cursor-pointer bg-card hover:bg-muted text-muted-foreground border-border" variant="outline">{q}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              
              <div className="p-3 bg-background/95 border-t border-border/50 space-y-3">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="relative flex items-center"
                >
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about this topic..." 
                    className="pr-12 bg-card border-border/50 h-12 rounded-full shadow-inner"
                    disabled={isTyping}
                  />
                  <div className="absolute right-1">
                    {isTyping ? (
                      <Button size="icon" variant="destructive" onClick={handleStop} className="h-10 w-10 rounded-full shadow-md">
                        <StopCircle className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="submit" size="icon" disabled={!input.trim()} className="h-10 w-10 rounded-full shadow-md transition-transform active:scale-95">
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>

                <Button onClick={handleContinueInFullChat} variant="secondary" className="w-full rounded-full gap-2 text-sm bg-primary/10 text-primary hover:bg-primary/20">
                  Continue in Full Chat <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-shadow hover:shadow-primary/50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </>
  );
}
