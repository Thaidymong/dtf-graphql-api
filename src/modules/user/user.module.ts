import { Module } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './user.service';
import { GraphQLRequestService } from 'src/common/providers/graphql-request/graphql-request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEnity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UserEnity])],
  providers: [UserResolver, UserService, GraphQLRequestService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
