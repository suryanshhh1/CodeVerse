export default function ChatLoading() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar Skeleton */}
      <div className="w-[300px] hidden lg:block border-r border-border/50 bg-card/30 p-6 space-y-6">
        <div className="h-10 w-full bg-muted/60 rounded-md animate-pulse"></div>
        <div className="space-y-4 pt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 w-full bg-muted/40 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Main Chat Skeleton */}
      <div className="flex-1 flex flex-col h-full bg-background/50">
        {/* Header */}
        <div className="h-14 border-b border-border/50 flex items-center justify-between px-6 bg-card/30">
          <div className="h-6 w-32 bg-muted/60 rounded-md animate-pulse"></div>
          <div className="h-8 w-8 bg-muted/40 rounded-md animate-pulse"></div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          <div className="flex gap-4 max-w-3xl mx-auto justify-end">
            <div className="h-16 w-64 bg-primary/20 rounded-2xl rounded-tr-sm animate-pulse"></div>
            <div className="w-8 h-8 rounded-full bg-muted/60 animate-pulse"></div>
          </div>
          
          <div className="flex gap-4 max-w-3xl mx-auto justify-start">
            <div className="w-8 h-8 rounded-full bg-muted/60 animate-pulse"></div>
            <div className="h-32 w-full max-w-md bg-card border border-border/50 rounded-2xl rounded-tl-sm animate-pulse"></div>
          </div>
          
          <div className="flex gap-4 max-w-3xl mx-auto justify-end">
            <div className="h-12 w-48 bg-primary/20 rounded-2xl rounded-tr-sm animate-pulse"></div>
            <div className="w-8 h-8 rounded-full bg-muted/60 animate-pulse"></div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 border-t border-border/50 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="h-24 w-full bg-card/50 border border-border/50 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
