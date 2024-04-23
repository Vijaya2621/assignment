import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';

export class HospitalDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'address' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'hospitalId' })
  @IsString()
  hospitalId: string;

  @ApiProperty({ description: 'city' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'state' })
  @IsString()
  state?: string;

  @ApiProperty({ description: 'zipCode ' })
  @IsString()
  zipCode?: string;

  @ApiProperty({ description: 'phoneNumber ' })
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'email ' })
  @IsString()
  email: string;
}

//find  for hospital module
export class FindHospitalDto extends PaginationDto {
  @ApiProperty({ description: 'sort', required: false })
  @IsString()
  sort?: string;

  @ApiProperty({
    description: 'hospitalId',
    required: false,
  })
  @IsString()
  hospitalId?: string;

  @ApiProperty({
    description: 'City',
    required: false,
  })
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'password',
    required: false,
  })
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'State',
    required: false,
  })
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'Name',
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
