import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityWithMeta } from 'apps/abstracts';
import { HealthCareWorker } from 'apps/doctor/src/doctor.entity';
import { Patient } from 'apps/patient/src/patient.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Notes extends BaseEntityWithMeta {
  @ApiProperty({ description: 'title' })
  @Column({ unique: true })
  title: string;

  @ApiProperty({ description: 'description' })
  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  description: string;

  @ApiProperty({ description: 'healthCareWorker' })
  @ManyToOne(() => HealthCareWorker, (healthCareWorker) => healthCareWorker.id)
  @JoinColumn({ name: 'healthCareWorkerId' })
  healthCareWorker: HealthCareWorker[];

  @ApiProperty({ description: 'patient' })
  @ManyToOne(() => Patient, (patient) => patient.id)
  @JoinColumn({ name: 'patientId' })
  patient: Patient[];
}
