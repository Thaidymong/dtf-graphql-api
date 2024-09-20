import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class AllOfficersPaginationDto {
  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  page: number;

  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  limit: number;
}
