import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { GENDER, ROLES } from 'apps/utils/entities';

export class PatientDto {
  @ApiProperty({ description: 'image' })
  @IsString()
  image: string;

  @ApiProperty({ description: 'active' })
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: 'role' })
  @IsString()
  role: ROLES;

  @ApiProperty({ description: 'email' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'password ' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'condition ' })
  @IsString()
  condition: string;

  @ApiProperty({ description: 'name ' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'phoneNumber ' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ description: 'dateOfBirth ' })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({ description: 'education ' })
  @IsString()
  education?: string;

  @ApiProperty({ description: 'enrolledDate ' })
  @IsString()
  enrolledDate: string;

  @ApiProperty({ description: 'height ' })
  @IsString()
  height?: string;

  @ApiProperty({ description: 'weight ' })
  @IsString()
  weight?: string;

  @ApiProperty({ description: 'gender ' })
  @IsString()
  gender?: GENDER;
}

//find  for patient module
export class FindPatientDto extends PaginationDto {
  @ApiProperty({ description: 'sort', required: false })
  @IsString()
  sort?: string;

  @ApiProperty({
    description: 'Condition',
    required: false,
  })
  @IsString()
  condition?: string;

  @ApiProperty({
    description: 'Education',
    required: false,
  })
  @IsString()
  education?: string;

  @ApiProperty({ description: 'role' })
  @IsString()
  role?: ROLES;

  @ApiProperty({
    description: 'Email',
    required: false,
  })
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Name',
    required: false,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Gender',
    required: false,
  })
  @IsString()
  gender?: string;

  @ApiProperty({
    description: 'Search',
    required: false,
  })
  @IsString()
  search?: string;
}
