import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindHospitalDto, HospitalDto } from './hospital.dto';
import { MESSAGES, STATUSCODE } from 'apps/utils/message';
import { Hospital } from './hospital.entity';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get()
  getHello(): string {
    return this.hospitalService.getHello();

    /**
     * controller to create hospital
     */
  }
  @Post()
  @ApiOperation({ summary: MESSAGES.CREATE('Hospital') })
  @ApiResponse({
    status: STATUSCODE.success,
    description: MESSAGES.CREATE('Hospital'),
    type: HospitalDto,
  })
  @ApiResponse({
    status: STATUSCODE.internalservererror,
    description: MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.badRequest,
    description: MESSAGES.VALIDATION_ERROR,
  })
  create(
    @Body()
    data: HospitalDto,
  ) {
    return this.hospitalService.createHospital(data);
  }

  /**
   * controller to find a particular hospital by id
   */
  @Get('/:id')
  @ApiOperation({ summary: MESSAGES.FETCH('hospital') })
  @ApiResponse({
    status: STATUSCODE.success,
    description: MESSAGES.FETCH('hospital'),
    type: Hospital,
  })
  @ApiResponse({
    status: STATUSCODE.internalservererror,
    description: MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.badRequest,
    description: MESSAGES.VALIDATION_ERROR,
  })
  async findHospitalById(
    @Param('id')
    id: string,
  ) {
    return await this.hospitalService.findHospitalById(id);
  }

  /**
   * controller to find a particular hospital by id
   */
  @Get()
  @ApiOperation({ summary: MESSAGES.FETCH('hospital') })
  @ApiResponse({
    status: STATUSCODE.success,
    description: MESSAGES.FETCH('hospital'),
    type: Hospital,
  })
  @ApiResponse({
    status: STATUSCODE.internalservererror,
    description: MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.badRequest,
    description: MESSAGES.VALIDATION_ERROR,
  })
  async findAllHospital(@Query() data: FindHospitalDto) {
    return await this.hospitalService.getAll(data);
  }

  /**
   * controller to update a particular hospital by id
   */
  @Patch('/:id')
  @ApiOperation({ summary: MESSAGES.UPDATE('hospital') })
  @ApiResponse({
    status: STATUSCODE.success,
    description: MESSAGES.UPDATE('hospital'),
    isArray: true,
    type: HospitalDto,
  })
  @ApiResponse({
    status: STATUSCODE.internalservererror,
    description: MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.badRequest,
    description: MESSAGES.VALIDATION_ERROR,
  })
  async updateHospital(
    @Param('id')
    id: string,
    data: HospitalDto,
  ) {
    return await this.hospitalService.updateHospital(data, id);
  }

  /**
   * controller to delete a particular hospital by id
   */
  @Delete('/:id')
  @ApiOperation({ summary: MESSAGES.UPDATE('hospital') })
  @ApiResponse({
    status: STATUSCODE.success,
    description: MESSAGES.UPDATE('hospital'),
    isArray: true,
    type: HospitalDto,
  })
  @ApiResponse({
    status: STATUSCODE.internalservererror,
    description: MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.badRequest,
    description: MESSAGES.VALIDATION_ERROR,
  })
  async deleteHospital(
    @Param('id')
    id: string,
  ) {
    return await this.hospitalService.deleteHospital(id);
  }
}
