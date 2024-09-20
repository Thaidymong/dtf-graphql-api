import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FileResponse {
  @Field(() => String)
  filename: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  file_type: string;

  @Field(() => String)
  file_size: string;
}

@ObjectType()
export class UploadResponse {
  @Field(() => Int)
  status_code: number;

  @Field(() => String)
  message: string;

  @Field(() => FileResponse)
  data: FileResponse;
}

@ObjectType()
export class MultiUploadsResponse {
  @Field(() => Int)
  status_code: number;

  @Field(() => String)
  message: string;

  @Field(() => [FileResponse])
  data: FileResponse[];
}
