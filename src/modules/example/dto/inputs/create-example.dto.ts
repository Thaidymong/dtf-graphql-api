import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateExampleDto {
  @Field(() => String)
  @IsString({ message: 'title must be string' })
  @IsNotEmpty({ message: 'title must not be empty' })
  example_title: string;

  @Field(() => String)
  @IsString({ message: 'description must be string' })
  @IsNotEmpty({ message: 'description must not be empty' })
  example_desc: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
