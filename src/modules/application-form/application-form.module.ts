import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardEntity, BusinessEntity, CategoryEntity, SupportingDocumentEntity } from './entities';
import { AwardRepository, BusinessRepository, CategoryRepository, SupportingDocumentRepository } from './repositories';
import { ApplicationFormService } from './services/application-form.service';
import { ApplicationFormResolver } from './resolvers/application-from.resolver';
import { LogService } from '../log/log.service';
import { AwardResolver } from './resolvers/award.resolver';
import { AwardService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([AwardEntity, BusinessEntity, CategoryEntity, SupportingDocumentEntity])],
  providers: [
    AwardRepository,
    ApplicationFormService,
    ApplicationFormResolver,
    BusinessRepository,
    CategoryRepository,
    SupportingDocumentRepository,
    LogService,
    AwardService,
    AwardResolver,
  ],
})
export class ApplicationFormModule {}
