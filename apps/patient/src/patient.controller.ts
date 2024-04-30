import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ERROR_MESSAGES,
  STATUSCODE,
  SUCCESS_MESSAGES,
} from 'apps/utils/message';
import { PatientDto } from './patient.dto';
import { YupValidationPipe } from 'apps/utils/validation';
import { PatientSchema } from './patient.schema';
import { TYPE } from 'apps/utils/entities';
import { AuthGuard } from 'apps/common/guards/auth.guard.services';
import { Patient } from './patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('hello')
  getHello(): string {
    return this.patientService.getHello();
  }

  /**
   * controller to create patient
   */
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.CREATE(TYPE.PATIENT) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.CREATE(TYPE.PATIENT),
    type: PatientDto,
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
    @Body(new YupValidationPipe(PatientSchema)) data: PatientDto,
    @Request() req,
  ): Promise<any> {
    // Extract the user's role from the request object
    const userRole = req?.user?.role;

    return this.patientService.createPatient(data, userRole);
  }

  /**
   * controller to find a particular hospital by id
   */
  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH(TYPE.PATIENT) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH(TYPE.PATIENT),
    type: Patient,
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
    return await this.patientService.findPatientById(id, userRole);
  }

  /**
   * controller to update a particular hospital by id
   */
  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE(TYPE.PATIENT) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE(TYPE.PATIENT),
    isArray: true,
    type: PatientDto,
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
    data: PatientDto,
    @Request() req,
  ) {
    const userRole = req.user.role;
    return await this.patientService.updatePatient(data, id, userRole);
  }

  /**
   * controller to delete a particular hospital by id
   */
  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE(TYPE.PATIENT) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE(TYPE.PATIENT),
    isArray: true,
    type: PatientDto,
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
    return await this.patientService.deletePatient(id, userRole);
  }
}
