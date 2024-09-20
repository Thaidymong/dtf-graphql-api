import { Field, ObjectType } from '@nestjs/graphql';
import { BusinessResponse } from './business.response';
import { CategoryResponse } from './category.response';

@ObjectType()
export class ApplicationFormResponse {
  @Field(() => BusinessResponse)
  business: BusinessResponse;

  @Field(() => CategoryResponse)
  category: CategoryResponse;
}
