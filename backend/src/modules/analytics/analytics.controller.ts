import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AnalyticsResponseDto } from './dto/analytics-response.dto';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get dashboard overview analytics' })
  @ApiResponse({
    status: 200,
    description: 'Returns comprehensive analytics data',
  })
  getOverview(): Promise<AnalyticsResponseDto> {
    return this.analyticsService.getOverview();
  }
}
