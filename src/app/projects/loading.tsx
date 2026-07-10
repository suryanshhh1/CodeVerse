export default function ProjectsLoading() {
  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-12">
      <div className="flex flex-col gap-4 max-w-2xl">
        <div className="h-10 w-64 bg-muted/60 rounded-md animate-pulse"></div>
        <div className="h-12 w-full max-w-lg bg-muted/40 rounded-md animate-pulse"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-card/50 border border-border/50 rounded-xl h-[240px] flex flex-col animate-pulse p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="h-6 w-20 bg-muted/60 rounded-full"></div>
              <div className="h-4 w-8 bg-muted/40 rounded-md"></div>
            </div>
            <div className="h-6 w-3/4 bg-muted/60 rounded-md mb-3"></div>
            <div className="h-4 w-full bg-muted/40 rounded-md mb-2"></div>
            <div className="h-4 w-2/3 bg-muted/40 rounded-md"></div>
            <div className="mt-auto pt-4 border-t border-border/50 flex gap-2">
              <div className="h-6 w-16 bg-muted/40 rounded-md"></div>
              <div className="h-6 w-20 bg-muted/40 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
