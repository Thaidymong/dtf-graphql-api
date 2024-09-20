import { IsBoolean, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/abstract.base.entity';
import { Column, Entity } from 'typeorm';

@Entity('examples')
export class ExampleEntity extends BaseEntity {
  @Column()
  @IsString()
  example_title: string;

  @Column()
  @IsString()
  example_desc: string;

  @Column()
  @IsBoolean()
  is_active: boolean;
}
