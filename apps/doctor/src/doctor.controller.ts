import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ERROR_MESSAGES,
  STATUSCODE,
  SUCCESS_MESSAGES,
} from 'apps/utils/message';
import { DoctorDto } from './doctor.dto';
import { Doctor } from './doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  getHello(): string {
    return this.doctorService.getHello();
  }

  /**
   * controller to create doctor
   */
  @Post()
  @ApiOperation({ summary: SUCCESS_MESSAGES.CREATE('Doctor') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.CREATE('Doctor'),
    type: DoctorDto,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  create(
    @Body()
    data: DoctorDto,
  ) {
    return this.doctorService.createDoctor(data);
  }

  /**
   * controller to find a particular doctor by id
   */
  @Get('/:id')
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH('doctor') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH('doctor'),
    type: Doctor,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async findDoctorById(
    @Param('id')
    id: string,
  ) {
    return await this.doctorService.findDoctorById(id);
  }

  /**
   * controller to update a particular Doctor by id
   */
  @Patch('/:id')
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE('Doctor') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE('Doctor'),
    isArray: true,
    type: DoctorDto,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async updateDoctor(
    @Param('id')
    id: string,
    @Body()
    data: DoctorDto,
  ) {
    return await this.doctorService.updateDoctor(data, id);
  }

  /**
   * controller to delete a particular Doctor by id
   */
  @Delete('/:id')
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE('Doctor') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE('Doctor'),
    isArray: true,
    type: DoctorDto,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async deleteDoctor(
    @Param('id')
    id: string,
  ) {
    return await this.doctorService.deleteDoctor(id);
  }
}
