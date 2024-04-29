import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityWithMeta } from '../../abstracts';
import { GENDER, ROLES } from '../../utils/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Hospitals } from 'apps/hospital/src/hospital.entity';

@Entity()
export class Patient extends BaseEntityWithMeta {
  @ApiProperty({ description: 'image' })
  @Column({ type: 'varchar', default: null, nullable: true })
  image: string;

  @ApiProperty({ description: 'status' })
  @Column({ type: 'boolean', default: false })
  active: boolean;

  @ApiProperty({ description: 'role' })
  @Column({ type: 'varchar', length: 100, default: ROLES.ADMIN })
  role: ROLES;

  @ApiProperty({ description: 'email' })
  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  email: string;

  @ApiProperty({ description: 'password' })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  password: string;

  @ApiProperty({ description: 'specialzation' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  condition: string;

  @ApiProperty({ description: 'name' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @ApiProperty({ description: 'phoneNumber' })
  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @ApiProperty({ description: 'dateOfBirth' })
  @Column({ type: 'date', nullable: true })
  dateOfBirth: string;

  @ApiProperty({ description: 'education' })
  @Column({ type: 'varchar', nullable: true })
  education: string;

  @ApiProperty({ description: 'enrolledDate' })
  @Column({ type: 'varchar', nullable: true, default: null })
  enrolledDate: string;

  @ApiProperty({ description: 'height' })
  @Column({ type: 'int', nullable: true, default: null })
  height?: number;

  @ApiProperty({ description: 'weight' })
  @Column({ type: 'varchar', nullable: true, default: null })
  weight?: string;

  @ApiProperty({ description: 'gender' })
  @Column({ type: 'varchar', nullable: true, default: null })
  gender?: GENDER;

  @ApiProperty({ description: 'hospital' })
  @ManyToOne(() => Hospitals, (hospital: Hospitals) => hospital.id)
  @JoinColumn({ name: 'hospitalId' })
  hospital: string;
}
