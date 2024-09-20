import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { AwardData } from '../../interfaces';
import { BusinessResponse } from './business.response';
import { CategoryResponse } from './category.response';
import { SupportingDocumentResponse } from './supporting-document.response';

@ObjectType()
export class AwardResponse {
  @Field(() => BusinessResponse)
  business: BusinessResponse;

  @Field(() => CategoryResponse)
  category: CategoryResponse;

  @Field(() => GraphQLJSON)
  awardData: AwardData;

  @Field(() => [SupportingDocumentResponse])
  supportingDocuments: SupportingDocumentResponse[];
}
