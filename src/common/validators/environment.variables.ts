import { IsBooleanString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsOptional()
  @IsString()
  readonly NODE_ENV: 'development' | 'production' = 'development';

  @IsOptional()
  @IsNumber()
  readonly API_PORT: number = 3000;

  @IsOptional()
  @IsString()
  readonly API_VERSION: string = 'v1';

  @IsOptional()
  @IsString()
  readonly API_HOST: string = 'localhost';

  @IsOptional()
  @IsString()
  readonly CORS_ALLOWED_ORIGINS: string = '*';

  @IsOptional()
  @IsString()
  readonly SERVICE_VERSION: string = 'unknown';

  @IsOptional()
  @IsInt()
  readonly THROTTLER_TTL_S: number = 60;

  @IsOptional()
  @IsInt()
  readonly THROTTLER_LIMIT: number = 100;

  // default 20 MB
  @IsOptional()
  @IsInt()
  readonly MAX_FILE_SIZE_KB: number = 20 * 1024 * 1024;

  @IsOptional()
  @IsInt()
  MAX_FILE_SIZE: number = 20;

  @IsOptional()
  @IsInt()
  readonly MAX_FILE_COUNT: number = 20;

  @IsOptional()
  @IsBooleanString()
  readonly USE_GQL_PLAYGROUND: string = 'false';
}
