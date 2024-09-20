import { BaseEntity } from 'src/common/entities/abstract.base.entity';
import { Column, Entity } from 'typeorm';

@Entity('activity_logs')
export class ActivityLogEntity extends BaseEntity {
  @Column({ type: 'bigint', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', length: 225, nullable: false })
  activity_type: string;

  @Column({ type: 'varchar', length: 225, nullable: false })
  action: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip_address: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;
}
