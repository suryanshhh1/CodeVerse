"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User as UserIcon, Plus, MessageSquare, Search, Trash2, Edit2, Download, MoreVertical, Pin, Star, StopCircle, RefreshCw, Sparkles, Settings, Paperclip, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dynamic from "next/dynamic";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SyntaxHighlighter = dynamic(() => import("react-syntax-highlighter").then(mod => mod.Prism), {
  ssr: false,
  loading: () => <div className="w-full h-24 bg-muted/50 animate-pulse rounded-md my-2" />
});
import { createConversation, saveMessage, deleteConversation, renameConversation, togglePin, toggleFavorite } from "./actions";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSearchParams, useRouter } from "next/navigation";

// Types
type Attachment = {
  type: string;
  url: string;
  name: string;
};

type Message = {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
  attachments?: Attachment[];
};

type Conversation = {
  id: string;
  title: string;
  isPinned: boolean;
  isFavorite: boolean;
  contextUrl: string | null;
  updatedAt: Date;
  messages: Message[];
};

export default function ChatClient({ initialConversations = [], user }: { initialConversations: any[], user: any }) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations || []);
  const [activeId, setActiveId] = useState<string | null>(conversations[0]?.id || null);
  const [provider, setProvider] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const contextParam = searchParams.get('context');
  const idParam = searchParams.get('id');

  const activeConversation = conversations.find(c => c.id === activeId);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isGenerating]);

  // Handle URL parameters
  useEffect(() => {
    if (idParam) {
      const conv = conversations.find(c => c.id === idParam);
      if (conv) {
        setActiveId(idParam);
      }
      router.replace('/chat');
    } else if (contextParam) {
      handleNewChat(contextParam);
      router.replace('/chat');
    }
  }, [idParam, contextParam, conversations]);

  const handleNewChat = async (contextUrl?: string) => {
    try {
      const conv = await createConversation("New Conversation", contextUrl);
      setConversations([conv, ...conversations]);
      setActiveId(conv.id);
      if (contextUrl) {
        toast.success("AI is now aware of your current topic context!");
      }
    } catch (e) {
      toast.error("Failed to create chat");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      // Convert to base64 data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAttachments(prev => [...prev, {
            type: file.type,
            name: file.name,
            url: event.target!.result as string
          }]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const prompt = customPrompt || input;
    if ((!prompt.trim() && attachments.length === 0) || isGenerating) return;

    let convId = activeId;
    if (!convId) {
      try {
        const conv = await createConversation("New Conversation");
        setConversations([conv, ...conversations]);
        convId = conv.id;
        setActiveId(conv.id);
      } catch (e) {
        toast.error("Failed to create chat. Please try again.");
        return;
      }
    }

    const currentAttachments = [...attachments];
    const newMessage: Message = {
      id: "temp-" + Date.now(),
      role: "user",
      content: prompt,
      createdAt: new Date(),
      attachments: currentAttachments
    };

    setInput("");
    setAttachments([]);
    
    // Optimistic update
    setConversations(prev => prev.map(c => 
      c.id === convId ? { ...c, messages: [...c.messages, newMessage] } : c
    ));

    // Save user message to DB in background
    saveMessage(convId, "user", prompt, currentAttachments).catch(console.error);

    // Auto title generation if it's the first message
    const currentConv = conversations.find(c => c.id === convId);
    if (currentConv && currentConv.messages.length === 0) {
      const title = prompt.slice(0, 30) + (prompt.length > 30 ? "..." : "");
      renameConversation(convId, title).then(() => {
        setConversations(prev => prev.map(c => c.id === convId ? { ...c, title } : c));
      });
    }

    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    try {
      // Add a temporary empty model message for streaming
      const tempModelId = "temp-" + Date.now();
      setConversations(prev => prev.map(c => 
        c.id === convId ? { 
          ...c, 
          messages: [...c.messages, { id: tempModelId, role: "model", content: "", createdAt: new Date() }] 
        } : c
      ));

      // Get history for context
      const history = (currentConv?.messages || []).map(m => ({ role: m.role, content: m.content, attachments: m.attachments }));
      history.push({ role: "user", content: prompt, attachments: currentAttachments });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: history,
          pageContext: currentConv?.contextUrl
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        let errorMsg = "API Error";
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
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullReply = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunkText = decoder.decode(value, { stream: true });
          fullReply += chunkText;

          // Update the temporary message with the streamed chunk
          setConversations(prev => prev.map(c => 
            c.id === convId ? { 
              ...c, 
              messages: c.messages.map(m => m.id === tempModelId ? { ...m, content: fullReply } : m)
            } : c
          ));
        }
      }

      // Save to DB once stream finishes
      await saveMessage(convId, "model", fullReply);

    } catch (error: any) {
      if (error.name !== "AbortError") {
        toast.error("Failed to get response");
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteConversation(id);
      setConversations(prev => prev.filter(c => c.id !== id));
      if (activeId === id) setActiveId(null);
      toast.success("Chat deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleExport = (format: "md" | "txt" | "pdf") => {
    if (!activeConversation) return;
    
    let content = "";
    if (format === "md" || format === "txt") {
      content = activeConversation.messages.map(m => `### ${m.role.toUpperCase()}\n${m.content}\n\n`).join("");
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CodeVerseAI_Chat_${activeConversation.id}.${format}`;
      a.click();
      toast.success(`Chat exported as ${format.toUpperCase()}`);
    } else {
      // PDF mock for now, can use window.print() as simple solution
      window.print();
      toast.success("Printing to PDF...");
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredConversations.filter(c => c.isPinned);
  const favoriteChats = filteredConversations.filter(c => c.isFavorite && !c.isPinned);
  const regularChats = filteredConversations.filter(c => !c.isPinned && !c.isFavorite);

  const suggestedPrompts = [
    "Explain Time Complexity",
    "Generate a tricky React quiz",
    "Help me build a portfolio project",
    "Debug this JavaScript error",
  ];

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-72 border-r border-border/50 bg-card/30 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-border/50 space-y-4">
          <Button onClick={() => handleNewChat()} className="w-full gap-2 justify-start bg-primary/10 text-primary hover:bg-primary/20">
            <Plus className="w-4 h-4" /> New Chat
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search chats..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/50 border-border/50"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-2">
          {pinnedChats.length > 0 && (
            <div className="mb-4">
              <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">PINNED</p>
              {pinnedChats.map(c => <ChatItem key={c.id} c={c} activeId={activeId} setActiveId={setActiveId} handleDelete={handleDelete} setConversations={setConversations} />)}
            </div>
          )}
          
          {favoriteChats.length > 0 && (
            <div className="mb-4">
              <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">FAVORITES</p>
              {favoriteChats.map(c => <ChatItem key={c.id} c={c} activeId={activeId} setActiveId={setActiveId} handleDelete={handleDelete} setConversations={setConversations} />)}
            </div>
          )}

          {(() => {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const yesterday = today - 86400000;
            const lastWeek = today - 86400000 * 7;

            const todayChats = regularChats.filter(c => new Date(c.updatedAt).getTime() >= today);
            const yesterdayChats = regularChats.filter(c => {
              const t = new Date(c.updatedAt).getTime();
              return t >= yesterday && t < today;
            });
            const lastWeekChats = regularChats.filter(c => {
              const t = new Date(c.updatedAt).getTime();
              return t >= lastWeek && t < yesterday;
            });
            const olderChats = regularChats.filter(c => new Date(c.updatedAt).getTime() < lastWeek);

            return (
              <>
                {todayChats.length > 0 && (
                  <div className="mb-4">
                    <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">TODAY</p>
                    {todayChats.map(c => <ChatItem key={c.id} c={c} activeId={activeId} setActiveId={setActiveId} handleDelete={handleDelete} setConversations={setConversations} />)}
                  </div>
                )}
                {yesterdayChats.length > 0 && (
                  <div className="mb-4">
                    <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">YESTERDAY</p>
                    {yesterdayChats.map(c => <ChatItem key={c.id} c={c} activeId={activeId} setActiveId={setActiveId} handleDelete={handleDelete} setConversations={setConversations} />)}
                  </div>
                )}
                {lastWeekChats.length > 0 && (
                  <div className="mb-4">
                    <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">PREVIOUS WEEK</p>
                    {lastWeekChats.map(c => <ChatItem key={c.id} c={c} activeId={activeId} setActiveId={setActiveId} handleDelete={handleDelete} setConversations={setConversations} />)}
                  </div>
                )}
                {olderChats.length > 0 && (
                  <div className="mb-4">
                    <p className="px-2 text-xs font-semibold text-muted-foreground mb-2">OLDER</p>
                    {olderChats.map(c => <ChatItem key={c.id} c={c} activeId={activeId} setActiveId={setActiveId} handleDelete={handleDelete} setConversations={setConversations} />)}
                  </div>
                )}
              </>
            );
          })()}
        </ScrollArea>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col bg-background/50 relative">
        {/* Top bar */}
        <div className="h-14 border-b border-border/50 flex items-center justify-between px-6 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">{activeConversation?.title || "AI Tutor"}</h2>
            {provider && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${provider === "groq" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"}`}>
                Powered by {provider === "groq" ? "Groq 🟢" : "Gemini 🟡"}
              </span>
            )}
          </div>
          {activeConversation && (
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground h-9 w-9 inline-flex items-center justify-center rounded-md transition-colors outline-none">
                <MoreVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport("pdf")}><Download className="w-4 h-4 mr-2" /> Export to PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("md")}><Download className="w-4 h-4 mr-2" /> Export to Markdown</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("txt")}><Download className="w-4 h-4 mr-2" /> Export to TXT</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  togglePin(activeId!, !activeConversation.isPinned);
                  setConversations(prev => prev.map(c => c.id === activeId ? {...c, isPinned: !c.isPinned} : c));
                }}><Pin className="w-4 h-4 mr-2" /> {activeConversation.isPinned ? "Unpin" : "Pin"}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  toggleFavorite(activeId!, !activeConversation.isFavorite);
                  setConversations(prev => prev.map(c => c.id === activeId ? {...c, isFavorite: !c.isFavorite} : c));
                }}><Star className="w-4 h-4 mr-2" /> {activeConversation.isFavorite ? "Unfavorite" : "Favorite"}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Chat window */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 space-y-6">
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 ring-8 ring-primary/5">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">CodeVerse AI Tutor</h1>
                <p className="text-muted-foreground text-lg">Your personal genius for computer science, coding, and interview prep.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-8">
                {suggestedPrompts.map((prompt, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="h-auto p-4 justify-start text-left bg-card/50 hover:bg-primary/10 hover:text-primary transition-all border-border/50 rounded-xl"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {activeConversation.messages.map((msg, i) => (
                  <motion.div 
                    key={msg.id || i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 w-full max-w-3xl mx-auto ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                  {msg.role !== "user" && (
                    <Avatar className="w-8 h-8 shrink-0 ring-1 ring-border/50">
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex flex-col gap-2 max-w-[95%] md:max-w-[85%] min-w-0">
                    <div className={`rounded-2xl px-5 py-4 overflow-x-auto ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-card border border-border/50 shadow-sm rounded-tl-sm text-card-foreground prose prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-pre:bg-transparent max-w-full w-full"
                    }`}>
                      {msg.role === "user" ? (
                        <div className="flex flex-col gap-2">
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {msg.attachments.map((att, i) => (
                                <img key={i} src={att.url} alt="Attachment" className="max-w-xs max-h-64 object-contain rounded-lg shadow-sm border border-border/20 bg-background/50" />
                              ))}
                            </div>
                          )}
                          <span>{msg.content}</span>
                        </div>
                      ) : msg.content === "" ? (
                        <div className="flex items-center gap-1 h-6">
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({node, inline, className, children, ...props}: any) {
                              const match = /language-(\w+)/.exec(className || '')
                              return !inline && match ? (
                                <div className="rounded-lg overflow-hidden my-4 border border-border/50 bg-[#1e1e1e] max-w-full">
                                  <div className="bg-zinc-900 px-4 py-2 text-xs text-zinc-400 border-b border-zinc-800 flex justify-between">
                                    <span>{match[1]}</span>
                                    <button onClick={() => {
                                      navigator.clipboard.writeText(String(children));
                                      toast.success("Code copied!");
                                    }} className="hover:text-white transition-colors">Copy</button>
                                  </div>
                                  <div className="w-full overflow-x-auto">
                                    <SyntaxHighlighter
                                      {...props}
                                      style={vscDarkPlus}
                                      language={match[1]}
                                      PreTag="div"
                                      customStyle={{ margin: 0, padding: '1rem', background: 'transparent', minWidth: 'max-content' }}
                                    >
                                      {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                  </div>
                                </div>
                              ) : (
                                <code {...props} className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md text-sm font-mono">
                                  {children}
                                </code>
                              )
                            }
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>

                    {msg.role === "assistant" && !isGenerating && msg.content !== "" && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {[
                          "Explain Simpler", "Generate Quiz", "Interview Questions", 
                          "Time Complexity", "Visualize", "Examples"
                        ].map((action, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleSendMessage(action)}
                            className="text-[11px] px-2.5 py-1 rounded-full border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors text-muted-foreground whitespace-nowrap"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <Avatar className="w-8 h-8 shrink-0 ring-1 ring-border/50">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} className="h-4" />
            </>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 md:p-6 bg-background/80 backdrop-blur-xl border-t border-border/50">
          <div className="max-w-3xl mx-auto relative flex flex-col gap-2">
            
            {attachments.length > 0 && (
              <div className="flex gap-2 px-2 flex-wrap">
                {attachments.map((att, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-md overflow-hidden border border-border/50 group shadow-sm bg-card">
                    {att.type.startsWith('image/') ? (
                      <img src={att.url} alt={att.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-xs text-muted-foreground p-1 text-center break-all">
                        {att.name.slice(0, 10)}
                      </div>
                    )}
                    <button onClick={() => removeAttachment(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative flex items-center">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple accept="image/*" />
              <Button type="button" size="icon" variant="ghost" className="absolute left-2 h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground z-10" onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="w-5 h-5" />
              </Button>
              
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={isGenerating ? "AI is generating..." : "Ask anything about computer science..."}
                className="pl-14 pr-14 py-6 rounded-2xl bg-card border-border/50 shadow-sm focus-visible:ring-primary/20 text-base"
                disabled={isGenerating}
              />
              <div className="absolute right-2 flex gap-2">
                {isGenerating ? (
                  <Button size="icon" variant="destructive" onClick={handleStop} className="h-9 w-9 rounded-xl shadow-md">
                    <StopCircle className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button size="icon" onClick={() => handleSendMessage()} disabled={!input.trim()} className="h-9 w-9 rounded-xl shadow-md">
                    <Send className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            AI Tutor can make mistakes. Verify critical code and concepts.
          </p>
        </div>
      </div>
    </div>
  );
}

// Sidebar Chat Item Component
function ChatItem({ c, activeId, setActiveId, handleDelete, setConversations }: any) {
  return (
    <div 
      onClick={() => setActiveId(c.id)}
      className={`group flex items-center justify-between p-3 mb-1 rounded-xl cursor-pointer transition-all border \${
        activeId === c.id 
          ? 'bg-primary/10 border-primary/20 text-primary font-medium shadow-sm' 
          : 'hover:bg-card border-transparent text-muted-foreground hover:text-foreground'
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        {c.isFavorite ? <Star className="w-4 h-4 shrink-0 text-yellow-500" /> : <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />}
        <span className="truncate text-sm">{c.title}</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 hover:bg-background p-1.5 rounded-md transition-all outline-none">
          <MoreVertical className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            togglePin(c.id, !c.isPinned);
            setConversations((prev: any) => prev.map((chat: any) => chat.id === c.id ? {...chat, isPinned: !chat.isPinned} : chat));
          }}><Pin className="w-4 h-4 mr-2" /> {c.isPinned ? "Unpin" : "Pin"}</DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(c.id, !c.isFavorite);
            setConversations((prev: any) => prev.map((chat: any) => chat.id === c.id ? {...chat, isFavorite: !chat.isFavorite} : chat));
          }}><Star className="w-4 h-4 mr-2" /> {c.isFavorite ? "Unfavorite" : "Favorite"}</DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10" onClick={(e) => handleDelete(c.id, e)}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
