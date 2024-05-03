import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityWithMeta } from '../../abstracts';
import { ROLES } from '../../utils/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Hospitals } from 'apps/hospital/src/hospital.entity';
import { Patient } from 'apps/patient/src/patient.entity';
import { Notes } from 'apps/notes/src/notes.entity';

@Entity()
export class HealthCareWorker extends BaseEntityWithMeta {
  @ApiProperty({ description: 'is email verified' })
  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

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

  @ApiProperty({ description: 'specialization' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  specialization: string;

  @ApiProperty({ description: 'name' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @ApiProperty({ description: 'licenseNumber' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  licenseNumber: string;

  @ApiProperty({ description: 'phoneNumber' })
  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @ApiProperty({ description: 'hospital' })
  @ManyToOne(() => Hospitals, (hospital: Hospitals) => hospital.id)
  @JoinColumn({ name: 'hospitalId' })
  hospital: string;

  @ApiProperty({ description: 'patient' })
  @OneToMany(() => Patient, (patient) => patient.healthCareWorker)
  patient: Patient[];

  @ApiProperty({ description: 'patient' })
  @OneToMany(() => Notes, (notes) => notes.healthCareWorker)
  notes: Notes[];
}
