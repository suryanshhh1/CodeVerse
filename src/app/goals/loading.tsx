export default function GoalsLoading() {
  return (
    <div className="container max-w-5xl px-4 py-10 mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-muted/60 rounded-md animate-pulse"></div>
          <div className="h-5 w-80 bg-muted/40 rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-primary/20 rounded-md animate-pulse"></div>
      </div>

      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card/50 border border-border/50 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-pulse">
            <div className="flex items-start gap-4 flex-1">
              <div className="h-12 w-12 rounded-full bg-muted/60 shrink-0"></div>
              <div className="space-y-3 w-full max-w-lg">
                <div className="h-6 w-3/4 bg-muted/60 rounded-md"></div>
                <div className="h-4 w-1/2 bg-muted/40 rounded-md"></div>
                <div className="h-2 w-full bg-muted/30 rounded-full mt-4"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end">
              <div className="h-8 w-24 bg-muted/40 rounded-md"></div>
              <div className="h-8 w-24 bg-muted/40 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
