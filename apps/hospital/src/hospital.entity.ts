import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityWithId } from 'apps/abstracts';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class Hospital extends BaseEntityWithId {
  @ApiProperty({ description: 'hospitalId' })
  @Column({ unique: true })
  hospitalId: string;

  @ApiProperty({ description: 'name' })
  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

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
}
