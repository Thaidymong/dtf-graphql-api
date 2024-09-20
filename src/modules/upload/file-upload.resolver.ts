import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { UploadService } from './file-upload.service';
import { HttpStatusCode } from 'axios';
import { MultiUploadsResponse, UploadResponse } from './dto/file-upload.response';

@Resolver()
export class FileUploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => UploadResponse)
  async signgleUploadFileMutation(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<UploadResponse> {
    const data = await this.uploadService.uploadToMoCAsset(file);
    return {
      status_code: HttpStatusCode.Created,
      message: 'File has been uploaded',
      data,
    };
  }

  @Mutation(() => MultiUploadsResponse)
  async multipleUploadFilesMutation(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: Promise<FileUpload>[],
  ): Promise<MultiUploadsResponse> {
    const resolvedFiles = await Promise.all(files);
    const data = await Promise.all(resolvedFiles.map(file => this.uploadService.uploadToMoCAsset(file)));

    return {
      status_code: HttpStatusCode.Created,
      message: 'Files have been uploaded',
      data,
    };
  }
}
