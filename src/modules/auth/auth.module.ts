import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtExpiration } from './auth.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEnity } from '../user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserEnity]),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: jwtExpiration },
      }),
      inject: [ConfigService],
    }),
  ],

  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
