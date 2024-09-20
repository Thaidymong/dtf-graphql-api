import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/abstract.base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEnity extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  @IsNumber()
  hr_employee_id: number;

  @Column({ type: 'varchar', length: 225, nullable: false })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  @IsString()
  @IsEmpty()
  fullname: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  @IsString()
  @IsEmpty()
  fullname_en: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  @IsEmpty()
  profile: string;

  @Column({ type: 'varchar', length: 225, nullable: false })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  @IsString()
  @IsNotEmpty()
  leader_department: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  @IsString()
  @IsNotEmpty()
  general_department: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  @IsString()
  @IsNotEmpty()
  department: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  @IsString()
  @IsNotEmpty()
  office: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  @IsString()
  @IsEmpty()
  gender: string;
}
