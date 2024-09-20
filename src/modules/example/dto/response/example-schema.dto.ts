import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Example {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  example_title: string;

  @Field(() => String)
  example_desc: string;

  @Field(() => Boolean)
  is_active: boolean;
}
