import { Field, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Example } from './example-schema.dto';

@ObjectType()
export class AllExamplesResponse {
  @Field(() => Int, { nullable: true })
  statusCode: number;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => [Example], { nullable: true })
  data: Example[];
}

@ObjectType()
export class ExampleResponse {
  @Field(() => Int, { nullable: true })
  statusCode: number;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Example, { nullable: true })
  data: Example;
}

@ObjectType()
export class CreateExampleResponse {
  @Field(() => Int, { nullable: true })
  statusCode: number;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Example, { nullable: true })
  data: Example;
}

@ObjectType()
export class UpdateExampleResponse extends PickType(CreateExampleResponse, ['statusCode', 'message', 'data'] as const) {}

@ObjectType()
export class DeleteExampleResponse extends PickType(CreateExampleResponse, ['statusCode', 'message'] as const) {}
