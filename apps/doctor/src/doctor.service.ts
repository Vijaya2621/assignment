import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'apps/abstracts';
import { Doctor } from './doctor.entity';
import { Repository } from 'typeorm';
import { DoctorDto } from './doctor.dto';
import {
  ERROR_MESSAGES,
  STATUSCODE,
  SUCCESS_MESSAGES,
} from 'apps/utils/message';
import * as bcrypt from 'bcrypt';
import { errorResponses, responses } from 'apps/utils/response';

@Injectable()
export class DoctorService extends BaseService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {
    super();
  }
  getHello(): string {
    return 'Hello doctor';
  }

  /**create doctor
   *@param data
   *@description this function is used to create a doctor
   */
   async createDoctor(data: DoctorDto) {
    try {
      //  checking if the doctor already exist or not with there email

      const existingDoctor = await this.doctorRepository.findOne({
        where: { email: data.email },
      });
      if (existingDoctor) {
        return this._getBadRequestError(ERROR_MESSAGES.ALREADYEXIST(data.name));
      }
      //Hash the password before creating the user
      const hashedPassword = await bcrypt.hash(data.password, 15);
      data.password = hashedPassword;
      //    if not then create the new doctor
      const created = this.doctorRepository.create(data);
      // save the created doctor
      const saved = await this.doctorRepository.save(created);
      //  if saved then return success response
      const successRes = {
        saved,
        message: SUCCESS_MESSAGES.CREATE,
      };
      return await responses(successRes, STATUSCODE.SUCCESS); // use capital letters
      //   if not saved then return error response
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**get task Doctor
   *@description function to get Doctor
   *@param id DoctorId
   */

  async findDoctorById(id: string) {
    try {
      //check if the Doctor with the given id exist or not
      const foundDoctor = await this.doctorRepository.findOne({
        where: { id },
      });
      //if not found then return error
      if (!foundDoctor) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return await errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //if found then return Doctor
      const successRes = {
        foundDoctor,
        message: SUCCESS_MESSAGES.CREATE,
      };
      return await responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**update Doctor
   *@description function to update the Doctor
   *@param id DoctorId
   *@param data
   */

  async updateDoctor(data: DoctorDto, id: string) {
    try {
      //check if the Doctor exist or not of given id
      const foundDoctor = await this.doctorRepository.findOne({
        where: { id },
      });
      //if not then give error
      if (!foundDoctor) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return await errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //updating Doctor details
      const updateDoctor = await this.doctorRepository.preload({
        id,
        ...data,
      });
      //save the updated details of Doctor
      const updatedDoctor = await this.doctorRepository.save(updateDoctor);
      const successRes = {
        updatedDoctor,
        message: SUCCESS_MESSAGES.UPDATE,
      };
      return await responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**delete  Doctor
   *@description function to delete Doctor
   *@param id DoctorId
   */

  async deleteDoctor(id: string) {
    try {
      //check if the Doctor exist or not of given id
      const foundDoctor = await this.doctorRepository.findOne({
        where: { id },
      });
      //if not found then give error
      if (!foundDoctor) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return await errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //deleting the Doctor
      const deletedDoctor = await this.doctorRepository.delete(id);
      const successRes = {
        deletedDoctor,
        message: SUCCESS_MESSAGES.DELETE,
      };
      return await responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

}
