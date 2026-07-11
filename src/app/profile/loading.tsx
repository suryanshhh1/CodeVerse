import { Skeleton } from "@/components/ui/skeleton"
import { LayoutContainer } from "@/components/layout/LayoutContainer"

export default function ProfileLoading() {
  return (
    <LayoutContainer className="py-10 space-y-8 min-h-[calc(100vh-4rem)]">
      {/* Profile Header */}
      <div className="premium-glass p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="space-y-4 flex-1 text-center md:text-left">
          <Skeleton className="h-10 w-48 mx-auto md:mx-0" />
          <Skeleton className="h-5 w-64 mx-auto md:mx-0" />
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <Skeleton className="h-[200px] w-full rounded-2xl premium-glass" />
          <Skeleton className="h-[200px] w-full rounded-2xl premium-glass" />
        </div>
        <div className="md:col-span-2 space-y-8">
          <Skeleton className="h-[300px] w-full rounded-2xl premium-glass" />
          <Skeleton className="h-[200px] w-full rounded-2xl premium-glass" />
        </div>
      </div>
    </LayoutContainer>
  )
}
