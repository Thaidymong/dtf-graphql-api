import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateBusinessInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  business_name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  business_address: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  brief_description: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  contact_name: string;

  @Field(() => String)
  @IsEmail()
  @MaxLength(255)
  contact_email: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  contact_phone: string;
}
