"use client";

import { useAuth } from "@/src/api/services";
import { Subtitle, Title } from "@/src/components/features";

export default function DashboardPage() {

  const { user } = useAuth();

  return (
    <div className="h-full max-w-[1000px] mx-auto">
      <div>
        <Title>Welcome back, {user?.firstName}</Title>
        <Subtitle>67 items were scanned since you last visited</Subtitle>
      </div>
    </div>
  );
}
