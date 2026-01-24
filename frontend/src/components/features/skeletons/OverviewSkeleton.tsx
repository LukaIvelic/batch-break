import { cn } from "@/lib/utils";
import { Skeleton } from "../../ui/skeleton";

interface OverviewSkeletonProps {
  className?: string;
}

export function OverviewSkeleton({ className }: OverviewSkeletonProps) {
  return (
    <div
      className={cn("mx-auto h-full w-full max-w-5xl space-y-6 p-4", className)}
    >
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>

      <div className="space-y-8 py-4">
        <Skeleton className="h-[350px] w-full rounded-xl" />
        <Skeleton className="h-[350px] w-full rounded-xl" />
      </div>
    </div>
  );
}
