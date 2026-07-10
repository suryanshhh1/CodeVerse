export default function NoteDetailLoading() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar Skeleton */}
      <div className="w-[300px] hidden lg:block border-r border-border/50 bg-card/30 p-6 space-y-6">
        <div className="h-6 w-32 bg-muted/60 rounded-md animate-pulse"></div>
        <div className="space-y-4 pt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-muted/40 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header bar */}
        <div className="h-14 border-b border-border/50 flex items-center justify-between px-6 bg-background">
          <div className="h-6 w-48 bg-muted/60 rounded-md animate-pulse"></div>
          <div className="h-8 w-24 bg-muted/60 rounded-md animate-pulse"></div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="h-12 w-3/4 bg-muted/60 rounded-md animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-6 w-24 bg-muted/40 rounded-full animate-pulse"></div>
                <div className="h-6 w-24 bg-muted/40 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="space-y-4 pt-8">
              <div className="h-4 w-full bg-muted/40 rounded-md animate-pulse"></div>
              <div className="h-4 w-full bg-muted/40 rounded-md animate-pulse"></div>
              <div className="h-4 w-5/6 bg-muted/40 rounded-md animate-pulse"></div>
              <div className="h-4 w-full bg-muted/40 rounded-md animate-pulse"></div>
            </div>

            <div className="h-64 w-full bg-muted/30 rounded-xl animate-pulse mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
