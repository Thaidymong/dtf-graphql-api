import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { AwardEntity } from './award.entity';

@Entity('businesses')
export class BusinessEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  business_name: string;

  @Column({ type: 'varchar', length: 255 })
  business_address: string;

  @Column({ type: 'longtext' })
  brief_description: string;

  @Column({ type: 'varchar', length: 255 })
  contact_name: string;

  @Column({ type: 'varchar', length: 255 })
  contact_email: string;

  @Column({ type: 'varchar', length: 255 })
  contact_phone: string;

  @OneToOne(() => AwardEntity, award => award.business)
  award: AwardEntity;
}
