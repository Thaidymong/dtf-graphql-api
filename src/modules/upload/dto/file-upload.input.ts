import { Field, InputType } from '@nestjs/graphql';
import GraphQLUpload, { FileUpload } from 'graphql-upload-ts';

@InputType()
export class FileUploadInput {
  @Field(() => GraphQLUpload)
  file: FileUpload;
}
