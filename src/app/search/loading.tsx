import { Skeleton } from "@/components/ui/skeleton"
import { LayoutContainer } from "@/components/layout/LayoutContainer"

export default function SearchLoading() {
  return (
    <LayoutContainer className="py-10 space-y-12 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Skeleton className="h-[300px] w-full rounded-2xl premium-glass" />
        <Skeleton className="h-[300px] w-full rounded-2xl premium-glass" />
      </div>
    </LayoutContainer>
  )
}
