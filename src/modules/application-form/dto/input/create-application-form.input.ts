import { InputType, Field } from '@nestjs/graphql';
import { CreateBusinessInput } from './create-business.input';
import { CreateAwardInput } from './create-award.input';

@InputType()
export class CreateApplicationFormInput {
  @Field(() => CreateBusinessInput)
  createBusinessInput: CreateBusinessInput;

  @Field(() => CreateAwardInput)
  createAwardInput: CreateAwardInput;

  @Field(() => [String])
  file_urls: string[];
}
