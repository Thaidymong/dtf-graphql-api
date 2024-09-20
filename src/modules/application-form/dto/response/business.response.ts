import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BusinessResponse {
  @Field(() => String)
  business_name: string;

  @Field(() => String)
  business_address: string;

  @Field(() => String)
  brief_description: string;

  @Field(() => String)
  contact_name: string;

  @Field(() => String)
  contact_email: string;

  @Field(() => String)
  contact_phone: string;
}
