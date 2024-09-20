import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleResolver } from './resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleEntity } from './entities/example.entity';
import { ExampleRepository } from './repositories/example.repository';
import { LogService } from '../log/log.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExampleEntity])],
  providers: [ExampleService, ExampleResolver, ExampleRepository, LogService],
})
export class ExampleModule {}
