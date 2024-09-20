import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { AwardEntity } from './award.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => AwardEntity, award => award.category)
  awards: AwardEntity[];
}
