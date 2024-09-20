import { Module } from '@nestjs/common';
import { UploadService } from './file-upload.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileUploadResolver } from './file-upload.resolver';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.getOrThrow<number>('HTTP_TIMEOUT'),
        maxRedirects: configService.getOrThrow<number>('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UploadService, FileUploadResolver],
})
export class FileUploadModule {}
