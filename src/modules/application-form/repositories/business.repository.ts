import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from '../entities';

@Injectable()
export class BusinessRepository extends Repository<BusinessEntity> {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly repository: Repository<BusinessEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
