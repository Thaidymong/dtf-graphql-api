import { ShutdownSignal, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { json } from 'body-parser';
import { getConfig } from './configs/base/get-config';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

const bootstrap = async () => {
  const { expressConfig, bodyParserConfig, corsConfig, uploadFileConfig } = getConfig().basicConfig;
  const { port, host } = expressConfig;
  const { max_file_size, max_files } = uploadFileConfig;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enable('trust proxy');

  //Upload file
  app.use(
    graphqlUploadExpress({
      // Convert file size to MB
      maxFileSize: max_file_size * 1024 * 1024,
      maxFiles: max_files,
      overrideSendResponse: false,
    }),
  );

  // Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Helmet
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  app.enableCors(corsConfig);
  app.use(json(bodyParserConfig));
  app.enableShutdownHooks([ShutdownSignal.SIGINT, ShutdownSignal.SIGTERM]);

  await app.listen(port, host);
};

bootstrap();
