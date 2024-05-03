import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'apps/common/dtos/pagination.dto';
import { IsString } from 'class-validator';

export class NotesDto {
  @ApiProperty({ description: 'title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'description' })
  @IsString()
  description: string;
}

//find  for note module
export class FindNotesDto extends PaginationDto {
  @ApiProperty({ description: 'sort', required: false })
  @IsString()
  sort?: string;

  @ApiProperty({
    description: 'title',
    required: false,
  })
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'description',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Search',
    required: false,
  })
  @IsString()
  search?: string;
}
