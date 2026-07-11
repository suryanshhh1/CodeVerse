import { Skeleton } from "@/components/ui/skeleton"
import { LayoutContainer } from "@/components/layout/LayoutContainer"

export default function ProjectsLoading() {
  return (
    <LayoutContainer className="py-10 space-y-12">
      <div className="flex flex-col gap-4 max-w-2xl text-center mx-auto">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col p-6 space-y-4 premium-glass rounded-2xl">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="pt-4 flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </LayoutContainer>
  );
}
