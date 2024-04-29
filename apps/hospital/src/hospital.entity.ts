import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityWithMeta } from 'apps/abstracts';
import { HealthCareWorker } from 'apps/doctor/src/doctor.entity';
import { Patient } from 'apps/patient/src/patient.entity';
import { ROLES } from 'apps/utils/entities';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity()
export class Hospitals extends BaseEntityWithMeta {
  @ApiProperty({ description: 'hospitalId' })
  @Column({ unique: true })
  hospitalId: string;

  @ApiProperty({ description: 'name' })
  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @ApiProperty({ description: 'role' })
  @Column({ type: 'varchar', length: 100 })
  role: ROLES;

  @ApiProperty({ description: 'email' })
  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @ApiProperty({ description: 'address' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @ApiProperty({ description: 'city' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @ApiProperty({ description: 'state' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @ApiProperty({ description: 'zipCode' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  zipCode: string;

  @ApiProperty({ description: 'phoneNumber' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  phoneNumber: string;

  @ApiProperty({ description: 'healthcareWorkers' })
  @OneToMany(
    () => HealthCareWorker,
    (healthCareWorker) => healthCareWorker.hospital,
  )
  healthCareWorker: HealthCareWorker[];

  @ApiProperty({ description: 'patient' })
  @OneToMany(() => Patient, (patient) => patient.hospital)
  patient: Patient[];
}
