import { Module } from '@nestjs/common';
import { EncryptionService } from './encrypttion.service';

@Module({
  imports: [],
  providers: [EncryptionService],
})
export class EncryptionModule {}
