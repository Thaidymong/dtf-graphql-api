import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEnity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<UserEnity> {
  constructor(
    @InjectRepository(UserEnity)
    private readonly repository: Repository<UserEnity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
