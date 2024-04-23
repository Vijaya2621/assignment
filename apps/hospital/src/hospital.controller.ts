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
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STATUSCODE,
} from 'apps/utils/message';
import { Hospitals } from './hospital.entity';
import { YupValidationPipe } from 'apps/utils/validation';
import { CreateUserSchema } from './hospital.schema';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  /**
   * controller to create hospital
   */
  @Post()
  @ApiOperation({ summary: SUCCESS_MESSAGES.CREATE('Hospital') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.CREATE('Hospital'),
    type: HospitalDto,
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
    @Body(new YupValidationPipe(CreateUserSchema))
    data: HospitalDto,
  ) {
    return this.hospitalService.createHospital(data);
  }

  @Post('/logIn')
  @ApiOperation({ summary: SUCCESS_MESSAGES.CREATE('Hospital') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.CREATE('Hospital'),
    type: HospitalDto,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  logIn(
    @Body()
    data: HospitalDto,
  ) {
    return this.hospitalService.loginHospital(data);
  }

  /**
   * controller to find a particular hospital by id
   */
  @Get('/:id')
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH('hospital') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH('hospital'),
    type: Hospitals,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async findHospitalById(
    @Param('id')
    id: string,
  ) {
    return await this.hospitalService.findHospitalById(id);
  }

  /**
   * controller to find  hospital
   */
  @Get()
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH('hospital') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH('hospital'),
    type: Hospitals,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async findAllHospital(@Query() data: FindHospitalDto) {
    return await this.hospitalService.getAll(data);
  }

  /**
   * controller to update a particular hospital by id
   */
  @Patch('/:id')
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE('hospital') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE('hospital'),
    isArray: true,
    type: HospitalDto,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async updateHospital(
    @Param('id')
    id: string,
    @Body()
    data: HospitalDto,
  ) {
    return await this.hospitalService.updateHospital(data, id);
  }

  /**
   * controller to delete a particular hospital by id
   */
  @Delete('/:id')
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE('hospital') })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE('hospital'),
    isArray: true,
    type: HospitalDto,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async deleteHospital(
    @Param('id')
    id: string,
  ) {
    return await this.hospitalService.deleteHospital(id);
  }
}
