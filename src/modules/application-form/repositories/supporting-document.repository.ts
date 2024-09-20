import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupportingDocumentEntity } from '../entities';

@Injectable()
export class SupportingDocumentRepository extends Repository<SupportingDocumentEntity> {
  constructor(
    @InjectRepository(SupportingDocumentEntity)
    private readonly repository: Repository<SupportingDocumentEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
