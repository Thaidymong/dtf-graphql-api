import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityLogEntity } from '../entities/activity-log.entity';

@Injectable()
export class ActivityLogRepository extends Repository<ActivityLogEntity> {
  constructor(
    @InjectRepository(ActivityLogEntity)
    private readonly repository: Repository<ActivityLogEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
