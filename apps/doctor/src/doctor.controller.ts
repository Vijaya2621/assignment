import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ERROR_MESSAGES,
  STATUSCODE,
  SUCCESS_MESSAGES,
} from 'apps/utils/message';
import { DoctorDto, FindDoctorDto } from './doctor.dto';
import { HealthCareWorker } from './doctor.entity';
import { DoctorSchema } from './doctor.schema';
import { YupValidationPipe } from 'apps/utils/validation';
import { AuthGuard } from 'apps/common/guards/auth.guard.services';
import { TYPE } from 'apps/utils/entities';
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  /**
   * controller to find  Doctor
   */
  @Get('/all')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH(TYPE.HEALTHCARE_WORKER) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH(TYPE.HEALTHCARE_WORKER),
    type: HealthCareWorker,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async findAllDoctor(@Query() data: FindDoctorDto, @Request() req) {
    const userRole = req?.user?.role;
    return await this.doctorService.getAll(data, userRole);
  }

  @Get()
  getHello(): string {
    return this.doctorService.getHello();
  }

  /**
   * controller to create doctor
   */
  @Post()
  @ApiOperation({ summary: SUCCESS_MESSAGES.CREATE(TYPE.HEALTHCARE_WORKER) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.CREATE(TYPE.HEALTHCARE_WORKER),
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
    @Body(new YupValidationPipe(DoctorSchema)) data: DoctorDto,
    @Request() req,
  ): Promise<any> {
    // Extract the user's role from the request object
    const userRole = req?.body?.role;
    return this.doctorService.createDoctor(data, userRole);
  }

  /**
   * controller to find a particular doctor by id
   */
  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH(TYPE.HEALTHCARE_WORKER) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH(TYPE.HEALTHCARE_WORKER),
    type: HealthCareWorker,
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
    @Request() req,
  ) {
    const userRole = req?.user?.role;
    return await this.doctorService.findDoctorById(id, userRole);
  }

  /**
   * controller to find a particular doctor by email
   */
  @Get('/:email')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH(TYPE.HEALTHCARE_WORKER) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH(TYPE.HEALTHCARE_WORKER),
    type: HealthCareWorker,
  })
  @ApiResponse({
    status: STATUSCODE.INTERNALSERVERERROR,
    description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: STATUSCODE.BADREQUEST,
    description: ERROR_MESSAGES.VALIDATION_ERROR,
  })
  async findDoctorByEmial(
    @Param('email')
    email: string,
  ) {
    return await this.doctorService.findDoctorByEmail(email);
  }

  /**
   * controller to update a particular Doctor by id
   */
  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE(TYPE.HEALTHCARE_WORKER) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE(TYPE.HEALTHCARE_WORKER),
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
    @Request() req,
  ) {
    const userRole = req?.user?.role;
    return await this.doctorService.updateDoctor(data, id, userRole);
  }

  /**
   * controller to delete a particular Doctor by id
   */
  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE(TYPE.HEALTHCARE_WORKER) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE(TYPE.HEALTHCARE_WORKER),
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
    @Request() req,
  ) {
    const userRole = req?.user?.role;
    return await this.doctorService.deleteDoctor(id, userRole);
  }

  /**
   * controller to login
   */
  @Post('/logIn')
  @ApiOperation({ summary: SUCCESS_MESSAGES.CREATE(TYPE.HEALTHCARE_WORKER) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.CREATE(TYPE.HEALTHCARE_WORKER),
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
  logIn(
    @Body()
    data: DoctorDto,
  ) {
    return this.doctorService.loginHealthCareWorker(data);
  }
}
