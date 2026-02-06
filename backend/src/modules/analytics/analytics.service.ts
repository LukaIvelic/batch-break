import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Shipment,
  ShipmentStatus,
} from '../shipments/entities/shipment.entity';
import { Article } from '../articles/entities/article.entity';
import {
  Issue,
  IssueStatus,
  IssueSeverity,
} from '../issues/entities/issue.entity';
import { User } from '../users/entities/user.entity';
import { AnalyticsResponseDto } from './dto/analytics-response.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getOverview(): Promise<AnalyticsResponseDto> {
    const [shipmentStats, articleStats, issueStats, userStats, recentActivity] =
      await Promise.all([
        this.getShipmentStats(),
        this.getArticleStats(),
        this.getIssueStats(),
        this.getUserStats(),
        this.getRecentActivity(),
      ]);

    return {
      shipments: shipmentStats,
      articles: articleStats,
      issues: issueStats,
      users: userStats,
      recentActivity,
    };
  }

  private async getShipmentStats() {
    const shipments = await this.shipmentRepository.find();

    const total = shipments.length;
    const draft = shipments.filter(
      (s) => s.status === ShipmentStatus.DRAFT,
    ).length;
    const inProgress = shipments.filter(
      (s) => s.status === ShipmentStatus.IN_PROGRESS,
    ).length;
    const completed = shipments.filter(
      (s) => s.status === ShipmentStatus.COMPLETED,
    ).length;

    const totalArticlesScanned = shipments.reduce(
      (sum, s) => sum + s.scannedArticles,
      0,
    );
    const totalArticlesExpected = shipments.reduce(
      (sum, s) => sum + s.totalArticles,
      0,
    );
    const overallProgress =
      totalArticlesExpected > 0
        ? Math.round((totalArticlesScanned / totalArticlesExpected) * 100)
        : 0;

    return {
      total,
      draft,
      inProgress,
      completed,
      totalArticlesScanned,
      totalArticlesExpected,
      overallProgress,
    };
  }

  private async getArticleStats() {
    const articles = await this.articleRepository.find();

    const total = articles.length;
    const totalScanned = articles.reduce((sum, a) => sum + a.scanned, 0);

    const topScannedArticles = [...articles]
      .sort((a, b) => b.scanned - a.scanned)
      .slice(0, 5)
      .map((a) => ({
        id: a.id,
        name: a.name,
        barcode: a.barcode,
        scanned: a.scanned,
      }));

    const categoryMap = new Map<string, number>();
    for (const article of articles) {
      const cat = article.category || 'Uncategorized';
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
    }
    const categoryCounts = Array.from(categoryMap.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    return {
      total,
      totalScanned,
      topScannedArticles,
      categoryCounts,
    };
  }

  private async getIssueStats() {
    const issues = await this.issueRepository.find();

    const total = issues.length;
    const resolved = issues.filter(
      (i) => i.issueStatus === IssueStatus.RESOLVED,
    ).length;
    const unresolved = issues.filter(
      (i) => i.issueStatus === IssueStatus.UNRESOLVED,
    ).length;
    const dismissed = issues.filter(
      (i) => i.issueStatus === IssueStatus.DISMISSED,
    ).length;

    const low = issues.filter(
      (i) => i.issueSeverity === IssueSeverity.LOW,
    ).length;
    const medium = issues.filter(
      (i) => i.issueSeverity === IssueSeverity.MEDIUM,
    ).length;
    const high = issues.filter(
      (i) => i.issueSeverity === IssueSeverity.HIGH,
    ).length;

    return {
      total,
      resolved,
      unresolved,
      dismissed,
      bySeverity: { low, medium, high },
    };
  }

  private async getUserStats() {
    const users = await this.userRepository.find();
    const total = users.length;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentlyActive = users.filter(
      (u) => u.updatedAt >= thirtyDaysAgo,
    ).length;

    return { total, recentlyActive };
  }

  private async getRecentActivity() {
    const recentShipments = await this.shipmentRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });

    const recentIssues = await this.issueRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['referencesShipment'],
    });

    return {
      recentShipments: recentShipments.map((s) => ({
        id: s.id,
        shipmentNumber: s.shipmentNumber,
        status: s.status,
        progress: s.progress,
        createdAt: s.createdAt,
      })),
      recentIssues: recentIssues.map((i) => ({
        id: i.id,
        description: i.description || '',
        severity: i.issueSeverity,
        status: i.issueStatus,
        createdAt: i.createdAt,
        shipmentNumber: i.referencesShipment?.shipmentNumber || 'N/A',
      })),
    };
  }
}
