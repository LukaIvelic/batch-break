"use client";

import { useEffect, useState } from "react";
import { useAuth, analyticsService } from "@/src/api/services";
import { OverviewSkeleton, Title, Subtitle } from "@/src/components/features";
import { Progress } from "@/src/components/ui/progress";
import { AnalyticsOverview } from "@/src/types";
import {
  Package,
  Layers,
  AlertTriangle,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  href,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  subtitle?: string;
  trend?: { value: number; positive: boolean };
  href?: string;
}) {
  const content = (
    <div className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-xs">
          <TrendingUp
            className={`h-3 w-3 ${trend.positive ? "text-green-500" : "text-red-500"}`}
          />
          <span className={trend.positive ? "text-green-500" : "text-red-500"}>
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

function ShipmentStatusCard({
  stats,
}: {
  stats: AnalyticsOverview["shipments"];
}) {
  return (
    <div className="bg-card border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Shipment Progress</h3>
        <Link
          href="/dashboard/shipments"
          className="text-xs text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium">{stats.overallProgress}%</span>
        </div>
        <Progress value={stats.overallProgress} className="h-2" />
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
              <Clock className="h-4 w-4" />
            </div>
            <p className="text-lg font-semibold">{stats.draft}</p>
            <p className="text-xs text-muted-foreground">Draft</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
              <TrendingUp className="h-4 w-4" />
            </div>
            <p className="text-lg font-semibold">{stats.inProgress}</p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
              <CheckCircle className="h-4 w-4" />
            </div>
            <p className="text-lg font-semibold">{stats.completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IssuesSummaryCard({ stats }: { stats: AnalyticsOverview["issues"] }) {
  return (
    <div className="bg-card border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Issues Overview</h3>
        <Link
          href="/dashboard/shipments/issues"
          className="text-xs text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <span className="text-sm">Unresolved</span>
          </div>
          <span className="font-semibold text-orange-500">
            {stats.unresolved}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Resolved</span>
          </div>
          <span className="font-semibold text-green-500">{stats.resolved}</span>
        </div>
        <div className="border-t pt-4">
          <p className="text-xs text-muted-foreground mb-2">By Severity</p>
          <div className="flex gap-2">
            <div className="flex-1 text-center p-2 bg-red-500/10 rounded">
              <p className="text-sm font-semibold text-red-500">
                {stats.bySeverity.high}
              </p>
              <p className="text-xs text-muted-foreground">High</p>
            </div>
            <div className="flex-1 text-center p-2 bg-yellow-500/10 rounded">
              <p className="text-sm font-semibold text-yellow-500">
                {stats.bySeverity.medium}
              </p>
              <p className="text-xs text-muted-foreground">Medium</p>
            </div>
            <div className="flex-1 text-center p-2 bg-green-500/10 rounded">
              <p className="text-sm font-semibold text-green-500">
                {stats.bySeverity.low}
              </p>
              <p className="text-xs text-muted-foreground">Low</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopArticlesCard({ stats }: { stats: AnalyticsOverview["articles"] }) {
  return (
    <div className="bg-card border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Top Scanned Articles</h3>
        <Link
          href="/dashboard/articles"
          className="text-xs text-primary hover:underline"
        >
          View all
        </Link>
      </div>
      {stats.topScannedArticles.length > 0 ? (
        <div className="space-y-3">
          {stats.topScannedArticles.map((article, index) => (
            <div
              key={article.id}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4">
                  {index + 1}.
                </span>
                <div>
                  <p className="text-sm font-medium truncate max-w-[180px]">
                    {article.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {article.barcode}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{article.scanned}</p>
                <p className="text-xs text-muted-foreground">scans</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          No articles scanned yet
        </p>
      )}
    </div>
  );
}

function RecentActivityCard({
  activity,
}: {
  activity: AnalyticsOverview["recentActivity"];
}) {
  const statusColors: Record<string, string> = {
    draft: "bg-yellow-500",
    in_progress: "bg-blue-500",
    completed: "bg-green-500",
    unresolved: "bg-orange-500",
    resolved: "bg-green-500",
    dismissed: "bg-gray-500",
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-card border rounded-xl p-5">
      <h3 className="font-medium mb-4">Recent Activity</h3>
      <div className="space-y-6">
        <div>
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
            Recent Shipments
          </p>
          {activity.recentShipments.length > 0 ? (
            <div className="space-y-2">
              {activity.recentShipments.map((shipment) => (
                <Link
                  key={shipment.id}
                  href={`/dashboard/shipments`}
                  className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {shipment.shipmentNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(shipment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {shipment.progress}%
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${statusColors[shipment.status] || "bg-gray-400"}`}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">
              No recent shipments
            </p>
          )}
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
            Recent Issues
          </p>
          {activity.recentIssues.length > 0 ? (
            <div className="space-y-2">
              {activity.recentIssues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/dashboard/shipments/issues`}
                  className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        issue.severity === 3
                          ? "text-red-500"
                          : issue.severity === 2
                            ? "text-yellow-500"
                            : "text-green-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px]">
                        {issue.description || `Issue #${issue.id}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {issue.shipmentNumber} • {formatDate(issue.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${statusColors[issue.status] || "bg-gray-400"}`}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">
              No recent issues
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryDistributionCard({
  categories,
}: {
  categories: AnalyticsOverview["articles"]["categoryCounts"];
}) {
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="bg-card border rounded-xl p-5">
      <h3 className="font-medium mb-4">Article Categories</h3>
      {categories.length > 0 ? (
        <div className="space-y-3">
          {categories.slice(0, 5).map((cat) => {
            const percentage =
              total > 0 ? Math.round((cat.count / total) * 100) : 0;
            return (
              <div key={cat.category}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="truncate max-w-[150px]">{cat.category}</span>
                  <span className="text-muted-foreground">
                    {cat.count} ({percentage}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-1.5" />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          No categories yet
        </p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await analyticsService.getOverview();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (authLoading || isLoading) return <OverviewSkeleton />;

  if (!analytics) {
    return (
      <div className="h-full max-w-6xl mx-auto p-4">
        <Title>Welcome back, {user?.firstName}</Title>
        <p className="text-muted-foreground mt-2">
          Unable to load analytics data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full max-w-6xl mx-auto p-4 space-y-6">
      <div>
        <Title>Welcome back, {user?.firstName}</Title>
        <Subtitle>
          Here&apos;s what&apos;s happening with your shipments today
        </Subtitle>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Shipments"
          value={analytics.shipments.total}
          icon={Package}
          subtitle={`${analytics.shipments.totalArticlesScanned} / ${analytics.shipments.totalArticlesExpected} items scanned`}
          href="/dashboard/shipments"
        />
        <StatCard
          title="Total Articles"
          value={analytics.articles.total}
          icon={Layers}
          subtitle={`${analytics.articles.totalScanned} total scans`}
          href="/dashboard/articles"
        />
        <StatCard
          title="Open Issues"
          value={analytics.issues.unresolved}
          icon={AlertTriangle}
          subtitle={`${analytics.issues.total} total issues`}
          href="/dashboard/shipments/issues"
        />
        <StatCard
          title="Team Members"
          value={analytics.users.total}
          icon={Users}
          subtitle={`${analytics.users.recentlyActive} active this month`}
          href="/dashboard/management/employees"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ShipmentStatusCard stats={analytics.shipments} />
        <IssuesSummaryCard stats={analytics.issues} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TopArticlesCard stats={analytics.articles} />
        <CategoryDistributionCard
          categories={analytics.articles.categoryCounts}
        />
        <RecentActivityCard activity={analytics.recentActivity} />
      </div>
    </div>
  );
}
