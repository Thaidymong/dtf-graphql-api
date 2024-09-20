import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateExampleDto {
  @Field(() => String, {
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  example_title: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  example_desc: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
