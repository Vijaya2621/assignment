import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityWithId } from '../../abstracts';
import { ROLES } from '../../utils/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class Doctor extends BaseEntityWithId {
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
  role?: ROLES;

  @ApiProperty({ description: 'email' })
  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  email: string;

  @ApiProperty({ description: 'password' })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  password: string;

  @ApiProperty({ description: 'specialzation' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  specialzation: string;

  @ApiProperty({ description: 'name' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @ApiProperty({ description: 'licenseNumber' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  licenseNumber: string;

  @ApiProperty({ description: 'phoneNumber' })
  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;
}
