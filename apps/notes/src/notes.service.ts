import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'apps/abstracts';
import { Notes } from './notes.entity';
import { Repository } from 'typeorm';
import { ROLES } from 'apps/utils/entities';
import {
  ERROR_MESSAGES,
  STATUSCODE,
  SUCCESS_MESSAGES,
} from 'apps/utils/message';
import { NotesDto } from './notes.dto';

@Injectable()
export class NotesService extends BaseService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {
    super();
  }
  getHello(): string {
    return 'Hello notes!';
  }

  /**create notes
   *@param data, userRole
   *@description this function is used to create a notes
   *@developedBy Vijaya Kumari
   */
  async createNotes(data: NotesDto, userRole: ROLES) {
    try {
      // Check if the user has permission to create a notes
      if (userRole !== ROLES.DOCTOR && userRole !== ROLES.HEALTHCARE_WORKER) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_CREATE_NOTES,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }

      //   create the new notes
      const created = this.notesRepository.create(data);

      // save the created notes
      const saved = await this.notesRepository.save(created);

      //  if saved then return success response
      const successRes = {
        saved,
        message: SUCCESS_MESSAGES.CREATE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);

      //   if not saved then return error response
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**get note
   *@description function to get note
   *@param id noteId
   *@param userRole
   *@developedBy Vijaya Kumari
   */

  async findNoteById(id: string, userRole: ROLES) {
    try {
      // Check if the user has permission to get a note
      if (userRole == ROLES.HEALTHCARE_WORKER || userRole == ROLES.PATIENT) {
        //return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_GET_NOTES,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the notes with the given id exist or not
      const foundNote = await this.notesRepository.findOne({
        where: { id },
      });
      //if not found then return error
      if (!foundNote) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //if found then return notes
      const successRes = {
        foundNote,
        message: SUCCESS_MESSAGES.FETCH,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**update notes
   *@description function to update the notes
   *@param id noteId
   *@param data, userRole
   *@developedBy Vijaya Kumari
   */

  async updateNotes(data: NotesDto, id: string, userRole) {
    try {
      // Check if the user has permission to update a notes
      if (userRole == ROLES.PATIENT || userRole == ROLES.HEALTHCARE_WORKER) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_UPDATE_NOTES,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the notes exist or not of given id
      const foundNotes = await this.notesRepository.findOne({
        where: { id },
      });
      //if not then give error
      if (!foundNotes) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //updating notes details
      const updateNotes = await this.notesRepository.preload({
        id,
        ...data,
      });
      //save the updated details of notes
      const updatedNotes = await this.notesRepository.save(updateNotes);
      const successRes = {
        updatedNotes,
        message: SUCCESS_MESSAGES.UPDATE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**delete  note
   *@description function to delete note
   *@param id noteId
   *@param userRole
   *@developedBy Vijaya Kumari
   */

  async deleteNote(id: string, userRole) {
    try {
      // Check if the user has permission to delete a note
      if (userRole == ROLES.PATIENT || userRole == ROLES.HEALTHCARE_WORKER) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_DELETE_NOTES,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the note exist or not of given id
      const foundNote = await this.notesRepository.findOne({
        where: { id },
      });
      //if not found then give error
      if (!foundNote) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //deleting the note
      const deletedNote = await this.notesRepository.delete(id);
      const successRes = {
        deletedNote,
        message: SUCCESS_MESSAGES.DELETE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }
}
