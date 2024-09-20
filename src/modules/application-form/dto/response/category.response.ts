import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryResponse {
  @Field(() => String)
  name: string;
}
