import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { IssuesService } from './issues.service';
import { Issue } from './entities/issue.entity';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Get()
  getIssues(): Promise<Issue[]> {
    return this.issuesService.getIssues();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 2, 3)
  @Post()
  createIssue(@Body() createData: Partial<Issue>): Promise<Issue> {
    return this.issuesService.createIssue(createData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 2, 3)
  @Patch(':id')
  updateIssue(
    @Param('id') id: number,
    @Body() updateData: Partial<Issue>,
  ): Promise<Issue | null> {
    return this.issuesService.updateIssue(id, updateData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(1, 2, 3)
  @Delete(':id')
  deleteIssue(@Param('id') id: number): Promise<void> {
    return this.issuesService.deleteIssue(id);
  }
}
