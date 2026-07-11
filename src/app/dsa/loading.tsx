import { Skeleton } from "@/components/ui/skeleton"
import { LayoutContainer } from "@/components/layout/LayoutContainer"

export default function DSALoading() {
  return (
    <LayoutContainer className="py-10 space-y-12">
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col p-6 space-y-4 premium-glass rounded-2xl">
            <div className="flex justify-between">
              <Skeleton className="h-8 w-8 rounded-xl" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </LayoutContainer>
  )
}
