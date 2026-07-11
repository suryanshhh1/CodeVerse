import { Skeleton } from "@/components/ui/skeleton"
import { LayoutContainer } from "@/components/layout/LayoutContainer"

export default function NotesLoading() {
  return (
    <LayoutContainer className="py-10 space-y-12">
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-2xl bg-muted/60 animate-pulse"></div>
        </div>
        <div className="h-12 w-64 mx-auto bg-muted/60 rounded-md animate-pulse"></div>
        <div className="h-6 w-96 mx-auto bg-muted/40 rounded-md animate-pulse"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-[200px] bg-card/50 border border-border/50 rounded-xl p-6 flex flex-col justify-between animate-pulse">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="h-4 w-16 bg-muted/60 rounded-md"></div>
                <div className="h-4 w-20 bg-muted/40 rounded-md"></div>
              </div>
              <div className="h-6 w-48 bg-muted/60 rounded-md mb-2"></div>
              <div className="h-4 w-full bg-muted/40 rounded-md"></div>
            </div>
            <div className="h-10 w-full bg-muted/60 rounded-md mt-4"></div>
          </div>
        ))}
      </div>
    </LayoutContainer>
  )
}
