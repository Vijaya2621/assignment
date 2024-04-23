import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { ROLES } from 'apps/utils/entities';

export class DoctorDto {
  @ApiProperty({ description: 'emailVerified' })
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty({ description: 'image' })
  @IsString()
  image: string;

  @ApiProperty({ description: 'active' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: 'role' })
  @IsString()
  role: ROLES;

  @ApiProperty({ description: 'specialzation' })
  @IsString()
  specialzation: string;

  @ApiProperty({ description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'name ' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'licenseNumber ' })
  @IsString()
  licenseNumber: string;

  @ApiProperty({ description: 'phoneNumber ' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'password ' })
  @IsString()
  password: string;
}

//find  for doctor module
export class FindDoctorDto extends PaginationDto {
  @ApiProperty({ description: 'sort', required: false })
  @IsString()
  sort?: string;

  @ApiProperty({
    description: 'emailVerified',
    required: false,
  })
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty({
    description: 'email',
    required: false,
  })
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'specialzation',
    required: false,
  })
  @IsString()
  specialzation?: string;

  @ApiProperty({
    description: 'name',
    required: false,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Search',
    required: false,
  })
  @IsString()
  search?: string;
}
