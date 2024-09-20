import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SupportingDocumentResponse {
  @Field(() => String)
  file_url: string;
}
