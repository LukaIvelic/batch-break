"use client";

import { useAuth } from "@/src/api/services";
import { OverviewSkeleton, Subtitle, Title } from "@/src/components/features";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <OverviewSkeleton />;

  return (
    <div className="h-full max-w-250 mx-auto">
      <div>
        <Title>Welcome back, {user?.firstName}</Title>
        <Subtitle>67 items were scanned since you last visited</Subtitle>
      </div>
    </div>
  );
}
