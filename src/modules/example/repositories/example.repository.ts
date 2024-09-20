import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExampleEntity } from '../entities/example.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExampleRepository extends Repository<ExampleEntity> {
  constructor(
    @InjectRepository(ExampleEntity)
    private readonly repository: Repository<ExampleEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
