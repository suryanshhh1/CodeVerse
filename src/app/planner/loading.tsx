export default function PlannerLoading() {
  return (
    <div className="container max-w-7xl px-4 py-8 mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-muted/60 rounded-md animate-pulse"></div>
          <div className="h-5 w-64 bg-muted/40 rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-primary/20 rounded-md animate-pulse"></div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card/30 border border-border/50 rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-card/50 flex justify-between items-center">
              <div className="h-6 w-24 bg-muted/60 rounded-md animate-pulse"></div>
              <div className="h-6 w-8 bg-muted/40 rounded-full animate-pulse"></div>
            </div>
            <div className="p-4 space-y-4 flex-1">
              {[...Array(i === 0 ? 3 : i === 1 ? 2 : 1)].map((_, j) => (
                <div key={j} className="bg-card border border-border/50 rounded-lg p-4 space-y-3 shadow-sm animate-pulse">
                  <div className="h-5 w-3/4 bg-muted/60 rounded-md"></div>
                  <div className="h-4 w-full bg-muted/40 rounded-md"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 w-16 bg-muted/40 rounded-full"></div>
                    <div className="h-6 w-6 rounded-full bg-muted/60"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
