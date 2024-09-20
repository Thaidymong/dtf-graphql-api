import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateActivityLogDto {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  activity_type: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  action: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsEmpty()
  ip_address: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsEmpty()
  description: string;
}
