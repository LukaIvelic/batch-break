export interface ShipmentStats {
  total: number;
  draft: number;
  inProgress: number;
  completed: number;
  totalArticlesScanned: number;
  totalArticlesExpected: number;
  overallProgress: number;
}

export interface ArticleStats {
  total: number;
  totalScanned: number;
  topScannedArticles: Array<{
    id: number;
    name: string;
    barcode: string;
    scanned: number;
  }>;
  categoryCounts: Array<{
    category: string;
    count: number;
  }>;
}

export interface IssueStats {
  total: number;
  resolved: number;
  unresolved: number;
  dismissed: number;
  bySeverity: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface UserStats {
  total: number;
  recentlyActive: number;
}

export interface RecentActivity {
  recentShipments: Array<{
    id: number;
    shipmentNumber: string;
    status: string;
    progress: number;
    createdAt: Date;
  }>;
  recentIssues: Array<{
    id: number;
    description: string;
    severity: number;
    status: string;
    createdAt: Date;
    shipmentNumber: string;
  }>;
}

export interface AnalyticsResponseDto {
  shipments: ShipmentStats;
  articles: ArticleStats;
  issues: IssueStats;
  users: UserStats;
  recentActivity: RecentActivity;
}
