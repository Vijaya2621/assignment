// base.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  Column,
} from 'typeorm';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
export abstract class BaseEntity {
  @ApiProperty({ description: 'created at ' })
  @CreateDateColumn({
    type: 'datetime',
    nullable: true,
  })
  @Index()
  createdAt: Date;

  @ApiProperty({ description: 'updated at ' })
  @UpdateDateColumn({
    type: 'datetime',
    nullable: true,
  })
  updatedAt: Date;
}

//Base entity to generate uuid
export abstract class BaseEntityWithId extends BaseEntity {
  @ApiProperty({ description: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

//Base entity to generate meta data like createdBy and updatedBy
export abstract class BaseEntityWithMeta extends BaseEntityWithId {
  @ApiProperty({ description: 'created by' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  createdBy: string;

  @ApiProperty({ description: 'updated by' })
  @Column({ type: 'varchar', length: 100, nullable: true })
  updatedBy: string;
}
