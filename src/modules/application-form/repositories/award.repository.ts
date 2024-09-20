import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AwardEntity } from '../entities';
import { AwardResponse } from '../dto/response';

@Injectable()
export class AwardRepository extends Repository<AwardEntity> {
  private readonly logger = new Logger(AwardRepository.name);
  constructor(
    @InjectRepository(AwardEntity)
    private readonly repository: Repository<AwardEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findAwardsByCategory(categoryName: string): Promise<AwardResponse[]> {
    return this.createQueryBuilder('award')
      .leftJoinAndSelect('award.business', 'business')
      .leftJoinAndSelect('award.category', 'category')
      .leftJoinAndSelect('award.supportingDocuments', 'supportingDocuments')
      .select([
        'award.awardData',
        'business.business_name',
        'business.business_address',
        'business.brief_description',
        'business.contact_name',
        'business.contact_email',
        'business.contact_phone',
        'category.name',
        'supportingDocuments.file_url',
      ])
      .where('category.name = :categoryName', { categoryName })
      .getMany();
  }
}
