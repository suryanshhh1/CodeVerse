export default function ProfileLoading() {
  return (
    <div className="container max-w-4xl px-4 py-10 mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-card/50 border border-border/50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 animate-pulse">
        <div className="w-32 h-32 rounded-full bg-muted/60 shrink-0"></div>
        <div className="space-y-4 text-center md:text-left flex-1">
          <div className="h-8 w-48 bg-muted/60 rounded-md mx-auto md:mx-0"></div>
          <div className="h-4 w-64 bg-muted/40 rounded-md mx-auto md:mx-0"></div>
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            <div className="h-6 w-20 bg-muted/40 rounded-full"></div>
            <div className="h-6 w-20 bg-muted/40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card/50 border border-border/50 rounded-xl p-6 text-center animate-pulse">
            <div className="h-8 w-16 bg-muted/60 rounded-md mx-auto mb-2"></div>
            <div className="h-4 w-24 bg-muted/40 rounded-md mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="space-y-6 pt-4">
        <div className="flex gap-4 border-b border-border/50 pb-2">
          <div className="h-8 w-24 bg-muted/60 rounded-md animate-pulse"></div>
          <div className="h-8 w-24 bg-muted/40 rounded-md animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 w-full bg-card/30 border border-border/50 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
