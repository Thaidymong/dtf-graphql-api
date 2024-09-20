import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '~/common/entities';
import { BusinessEntity } from './business.entity';
import { CategoryEntity } from './category.entity';
import { SupportingDocumentEntity } from './supporting-document.entity';
import { AwardData } from '../interfaces';

@Entity('awards')
export class AwardEntity extends BaseEntity {
  @OneToOne(() => BusinessEntity)
  @JoinColumn({ name: 'business_id' })
  business: BusinessEntity;

  @ManyToOne(() => CategoryEntity, category => category.awards)
  category: CategoryEntity;

  @Column({ type: 'json', name: 'award_data' })
  awardData: AwardData;

  @OneToMany(() => SupportingDocumentEntity, supportingDocument => supportingDocument.award, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  supportingDocuments: SupportingDocumentEntity[];
}
