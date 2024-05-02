import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ERROR_MESSAGES,
  STATUSCODE,
  SUCCESS_MESSAGES,
} from 'apps/utils/message';
import { NotesDto } from './notes.dto';
import { TYPE } from 'apps/utils/entities';
import { YupValidationPipe } from 'apps/utils/validation';
import { NotesSchema } from './notes.schema';
import { AuthGuard } from 'apps/common/guards/auth.guard.services';
import { Notes } from './notes.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getHello(): string {
    return this.notesService.getHello();
  }

  /**
   * controller to create notes
   */
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.CREATE(TYPE.NOTES) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.CREATE(TYPE.NOTES),
    type: NotesDto,
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
    @Body(new YupValidationPipe(NotesSchema)) data: NotesDto,
    @Request() req,
  ): Promise<any> {
    // Extract the user's role from the request object
    const userRole = req?.user?.role;

    return this.notesService.createNotes(data, userRole);
  }

  /**
   * controller to find a particular note by id
   */
  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.FETCH(TYPE.NOTES) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.FETCH(TYPE.NOTES),
    type: Notes,
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
    return await this.notesService.findNoteById(id, userRole);
  }

  /**
   * controller to update a particular note by id
   */
  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE(TYPE.NOTES) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE(TYPE.NOTES),
    isArray: true,
    type: Notes,
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
    data: NotesDto,
    @Request() req,
  ) {
    const userRole = req.user.role;
    return await this.notesService.updateNotes(data, id, userRole);
  }

  /**
   * controller to delete a particular note by id
   */
  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: SUCCESS_MESSAGES.UPDATE(TYPE.HOSPITAL) })
  @ApiResponse({
    status: STATUSCODE.SUCCESS,
    description: SUCCESS_MESSAGES.UPDATE(TYPE.HOSPITAL),
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
    return await this.notesService.deleteNote(id, userRole);
  }
}
