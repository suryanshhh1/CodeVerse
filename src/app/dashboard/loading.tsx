import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LayoutContainer } from "@/components/layout/LayoutContainer"

export default function DashboardLoading() {
  return (
    <LayoutContainer className="py-6 md:py-10 space-y-6 md:space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-48" />
        </div>
        <Skeleton className="h-14 w-48 rounded-2xl" />
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="premium-glass">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
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
    </LayoutContainer>
  );
}
