import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLError } from 'graphql';
import { FileUpload } from 'graphql-upload-ts';
import { catchError, firstValueFrom } from 'rxjs';
import { VALID_PDF_FORMAT } from 'src/common/constants';
import { ERRORSTATUSCODE, ERROR_MESSAGES } from 'src/common/errors';
import * as FormData from 'form-data';
import { filesize } from 'filesize';
import { ReadStream } from 'fs';
import { FileResponse } from './dto/file-upload.response';
import { AxiosError } from 'axios';
import { streamToBuffer } from 'src/common/utils';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly S1: string;
  private readonly S1_API_KEY: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.S1 = this.configService.getOrThrow('S1');
    this.S1_API_KEY = this.configService.getOrThrow('S1_API_KEY');
  }

  async uploadToMoCAsset({ mimetype, filename, createReadStream }: FileUpload): Promise<FileResponse> {
    const extension = mimetype.split('/')[1];

    const stream = createReadStream() as unknown as ReadStream;
    const buffer = await streamToBuffer(stream);

    if (!extension.match(VALID_PDF_FORMAT)) {
      throw new GraphQLError(ERROR_MESSAGES.UNSUPPORTED_MEDIA_TYPE, {
        extensions: {
          code: ERRORSTATUSCODE.UNSUPPORTED_MEDIA_TYPE,
        },
      });
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('mocspace', buffer, {
      filename,
      contentType: mimetype,
    });

    const { data } = await firstValueFrom(
      this.httpService
        .post(`${this.S1}/upload`, formData, {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${this.S1_API_KEY}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new GraphQLError(`An error happened!`);
          }),
        ),
    );

    return {
      filename,
      url: data.filename,
      file_type: extension,
      file_size: filesize(buffer.length, { standard: 'jedec' }),
    };
  }
}
