export default function DashboardLoading() {
  return (
    <div className="container max-w-7xl px-4 py-6 md:py-10 mx-auto space-y-6 md:space-y-8 min-h-[calc(100vh-4rem)]">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-64 bg-muted/60 rounded-md animate-pulse"></div>
          <div className="h-4 w-96 bg-muted/40 rounded-md animate-pulse"></div>
        </div>
        
        <div className="flex items-center gap-4 bg-card/50 border border-border/50 px-6 py-3 rounded-2xl">
          <div className="h-12 w-12 rounded-full bg-muted/60 animate-pulse"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-muted/60 rounded-md animate-pulse"></div>
            <div className="h-5 w-16 bg-muted/40 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card/50 border border-border/50 rounded-xl p-6 h-[116px] flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-muted/60 rounded-md animate-pulse"></div>
              <div className="h-4 w-4 bg-muted/60 rounded-md animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-8 w-16 bg-muted/60 rounded-md animate-pulse"></div>
              <div className="h-3 w-32 bg-muted/40 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card/50 border border-border/50 rounded-xl h-[250px] animate-pulse"></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card/50 border border-border/50 rounded-xl h-[200px] animate-pulse"></div>
            <div className="bg-card/50 border border-border/50 rounded-xl h-[200px] animate-pulse"></div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-card/50 border border-border/50 rounded-xl h-[600px] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
