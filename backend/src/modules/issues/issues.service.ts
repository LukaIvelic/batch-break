import { Injectable } from '@nestjs/common';
import { Issue } from './entities/issue.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
  ) {}

  async getIssues(): Promise<Issue[]> {
    return this.issueRepository.find({ order: { issueStatus: 'ASC' } });
  }

  async createIssue(issueData: Partial<Issue>): Promise<Issue> {
    const newIssue = this.issueRepository.create(issueData);
    return this.issueRepository.save(newIssue);
  }

  async updateIssue(
    id: number,
    updateData: Partial<Issue>,
  ): Promise<Issue | null> {
    await this.issueRepository.update(id, updateData);
    return this.issueRepository.findOneBy({ id });
  }

  async deleteIssue(id: number): Promise<void> {
    await this.issueRepository.delete(id);
  }
}
