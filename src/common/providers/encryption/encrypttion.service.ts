import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { GraphQLError } from 'graphql';
import { ERRORSTATUSCODE, ERROR_MESSAGES } from 'src/common/errors';
import { promisify } from 'util';

@Injectable()
export class EncryptionService {
  private readonly secretKey: string;
  private readonly algorithm: string;
  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.getOrThrow<string>('SECRET_KEY', 'secret');
    this.algorithm = this.configService.getOrThrow<string>('ENCRYPTION_ALGORITHM', 'aes-256-ctr');
  }

  async encrypt(plainText: string): Promise<string> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(this.secretKey, 'salt', 32)) as Buffer;
    const cipher = createCipheriv(this.algorithm, key, iv);
    const encryptedText = Buffer.concat([cipher.update(plainText), cipher.final()]);
    return `${iv.toString('hex')}:${encryptedText.toString('hex')}`;
  }

  async decrypt(encryptedText: string): Promise<string> {
    if (!encryptedText.includes(':')) {
      throw new GraphQLError(ERROR_MESSAGES.INVALID_CREDENTIALS, {
        extensions: {
          code: ERRORSTATUSCODE.INVALID_CREDENTIALS,
        },
      });
    }

    try {
      const [ivHex, encryptedHex] = encryptedText.split(':');
      const key = (await promisify(scrypt)(this.secretKey, 'salt', 32)) as Buffer;
      const iv = Buffer.from(ivHex, 'hex');
      const encryptedData = Buffer.from(encryptedHex, 'hex');
      const decipher = createDecipheriv(this.algorithm, key, iv);
      const decryptedText = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
      return decryptedText.toString();
    } catch (error) {
      throw new GraphQLError(ERROR_MESSAGES.INVALID_CREDENTIALS, {
        extensions: {
          code: ERRORSTATUSCODE.INVALID_CREDENTIALS,
        },
      });
    }
  }
}
