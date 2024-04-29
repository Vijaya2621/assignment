import {
  Body,
  Controller,
  Delete,
  Request,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
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
import { HospitalSchema } from './hospital.schema';
import { AuthGuard } from 'apps/common/guards/auth.guard.services';
import { TYPE } from 'apps/utils/entities';

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
    @Body(new YupValidationPipe(HospitalSchema)) data: HospitalDto,
    @Request() req,
  ): Promise<any> {
    // Extract the user's role from the request object
    const userRole = req?.body?.role;

    return this.hospitalService.createHospital(data, userRole);
  }

  /**
   * controller to find a particular hospital by id
   */
  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH(TYPE.HOSPITAL) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH(TYPE.HOSPITAL),
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
    @Request() req,
  ) {
    // Extract the user's role from the request object
    const userRole = req?.user?.role;
    return await this.hospitalService.findHospitalById(id, userRole);
  }

  /**
   * controller to find a particular hospital by email
   */
  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH(TYPE.HOSPITAL) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH(TYPE.HOSPITAL),
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
  async findHospitalByEmail(
    @Param('email')
    email: string,
  ) {
    return await this.hospitalService.findHospitalByEmail(email);
  }

  /**
   * controller to find  hospitals
   */
  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH(TYPE.HOSPITAL) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH(TYPE.HOSPITAL),
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
  async findAllHospital(@Query() data: FindHospitalDto, @Request() req) {
    const userRole = req?.user?.role;
    return await this.hospitalService.getAll(data, userRole);
  }

  /**
   * controller to update a particular hospital by id
   */
  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE(TYPE.HOSPITAL) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE(TYPE.HOSPITAL),
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
    @Request() req,
  ) {
    const userRole = req.user.role;
    return await this.hospitalService.updateHospital(data, id, userRole);
  }

  /**
   * controller to delete a particular hospital by id
   */
  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE(TYPE.HOSPITAL) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE(TYPE.HOSPITAL),
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
    @Request() req,
  ) {
    const userRole = req?.user?.role;
    return await this.hospitalService.deleteHospital(id, userRole);
  }
}
