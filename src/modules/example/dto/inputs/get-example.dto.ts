import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetExampleDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  example_title: string;
}
