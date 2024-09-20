import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { AwardEntity } from './award.entity';

@Entity('supporting_documents')
export class SupportingDocumentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  file_url: string;

  @ManyToOne(() => AwardEntity, award => award.supportingDocuments)
  award: AwardEntity;
}
