import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'apps/abstracts';
import { HealthCareWorker } from './doctor.entity';
import { Repository } from 'typeorm';
import { DoctorDto, FindDoctorDto } from './doctor.dto';
import {
  ERROR_MESSAGES,
  STATUSCODE,
  SUCCESS_MESSAGES,
} from 'apps/utils/message';
import * as bcrypt from 'bcrypt';
import { allowedFieldsToSortForDoctors } from 'apps/hospital/src/hospital.common';
import { IHealthCareWorker, ROLES } from 'apps/utils/entities';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DoctorService extends BaseService {
  constructor(
    @InjectRepository(HealthCareWorker)
    private readonly doctorRepository: Repository<HealthCareWorker>,
  ) {
    super();
  }
  getHello(): string {
    return 'Hello doctor';
  }

  /**create doctor
   *@param data, userRole
   *@description this function is used to create a doctor
   *@developedBy Vijaya Kumari
   */
  async createDoctor(data: DoctorDto, userRole) {
    try {
      // Check if the user has permission to create a healthcareworker
      if (userRole !== ROLES.SUPER_ADMIN && userRole !== ROLES.ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message:
            ERROR_MESSAGES.PERMISSION_DENIED_TO_CREATE_HEALTH_CARE_WORKER,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
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

  /**get Doctor by id
   *@description function to get Doctor by their id
   *@param id DoctorId
   @param userRole
   *@developedBy Vijaya Kumari
   */

  async findDoctorById(id: string, userRole) {
    try {
      // Check if the user has permission to find a healthcareworker
      if (userRole !== ROLES.SUPER_ADMIN && userRole !== ROLES.ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_GET_HEALTH_CARE_WORKER,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the Doctor with the given id exist or not
      const foundDoctor = await this.doctorRepository.findOne({
        where: { id },
      });
      //if not found then return error
      if (!foundDoctor) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //if found then return Doctor
      const successRes = {
        foundDoctor,
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

  /**update Doctor
   *@description function to update the Doctor
   *@param id DoctorId
   *@param data, userRole
   *@developedBy Vijaya Kumari
   */

  async updateDoctor(data: DoctorDto, id: string, userRole) {
    try {
      // Check if the user has permission to update a healthcareworker
      if (userRole !== ROLES.ADMIN && userRole !== ROLES.SUPER_ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message:
            ERROR_MESSAGES.PERMISSION_DENIED_TO_UPDATE_HEALTH_CARE_WORKER,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the Doctor exist or not of given id
      const foundDoctor = await this.doctorRepository.findOne({
        where: { id },
      });
      //if not then give error
      if (!foundDoctor) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
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
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**delete  Doctor
   *@description function to delete Doctor
   *@param id DoctorId
   @param userRole
   *@developedBy Vijaya Kumari
   */

  async deleteDoctor(id: string, userRole) {
    try {
      // Check if the user has permission to delete a healthcareworker
      if (userRole !== ROLES.ADMIN && userRole !== ROLES.SUPER_ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_DELETE_HOSPITAL,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the Doctor exist or not of given id
      const foundDoctor = await this.doctorRepository.findOne({
        where: { id },
      });
      //if not found then give error
      if (!foundDoctor) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //deleting the Doctor
      const deletedDoctor = await this.doctorRepository.delete(id);
      const successRes = {
        deletedDoctor,
        message: SUCCESS_MESSAGES.DELETE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**get listing of all doctor
   *@description function to get all doctor
   *@param data, userRole
   */
  async getAll(data: FindDoctorDto, userRole) {
    try {
      // Check if the user has permission to get a hospital
      if (userRole !== ROLES.SUPER_ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_GET_HOSPITAL,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      const qr = this.doctorRepository.createQueryBuilder('doctor');
      qr.select([
        'doctor.id',
        'doctor.emailVerified',
        'doctor.image',
        'doctor.email',
        'doctor.specialzation',
        'doctor.role',
        'doctor.phoneNumber',
        'doctor.name',
      ]);
      //sorting
      if (data.sort) {
        const param = this.buildSortParams<{
          name: string;
        }>(data.sort);
        if (allowedFieldsToSortForDoctors.includes(param[0])) {
          const KEYS = {
            name: `doctor.${param[0]}`,
          };
          // Order by key and parameter
          qr.orderBy(KEYS[param[0]], param[1]);
        }
      } else {
        qr.orderBy(`doctor.updatedAt`, 'DESC');
      }
      //pagination
      return await this._paginate<IHealthCareWorker>(qr, {
        limit: data.limit || 10,
        page: data.page || 1,
      });
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**get Doctor by email
   *@description function to get Doctor by their email
   *@param email
   *@developedBy Vijaya Kumari
   */
  async findDoctorByEmail(email: string) {
    try {
      //check if the hospital with the given id exist or not
      const foundDoctor = await this.doctorRepository.findOne({
        where: { email },
      });
      //if not found then return error
      if (!foundDoctor) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //if found then return hospital
      const successRes = {
        foundDoctor,
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

  /**login healtCareWorker
   *@description function to login a healtCareWorker
   *@param  req
   *@developedBy Vijaya Kumari
   */
  async loginHealthCareWorker(req) {
    try {
      const { password } = req;
      //checking if the user is registered or not
      const healtCareWorker = await this.doctorRepository.findOne({
        where: { email: req.email },
      });
      if (!healtCareWorker) {
        const errorRes = {
          message: ERROR_MESSAGES.INVALIDLOGIN,
        };
        return this.errorResponses(errorRes, STATUSCODE.FAILED);
      }

      //comparing password of user
      const comparepassword = await bcrypt.compare(
        password,
        healtCareWorker.password,
      );

      if (!comparepassword) {
        const errorRes = {
          message: ERROR_MESSAGES.INVALIDLOGIN,
        };
        return this.errorResponses(errorRes, STATUSCODE.FAILED);
      }

      const myToken = process.env.SECRET_KEY;
      if (!myToken) {
        // Handle the case where SECRET_KEY is not defined
        throw new Error('SECRET_KEY is not defined');
      }

      let token;
      //checking if password is correct then generate token
      if (comparepassword == true) {
        token = jwt.sign(
          {
            id: healtCareWorker.id,
            email: healtCareWorker.email,
            role: healtCareWorker.role,
          },
          myToken,
          { expiresIn: process.env.EXPIRESIN },
        );
        const successRes = {
          generatedToken: token,
          message: SUCCESS_MESSAGES.CREATE,
        };
        return this.responses(successRes, STATUSCODE.SUCCESS);
      }
      //otherwise return error
      const errorRes = {
        message: ERROR_MESSAGES.INVALIDLOGIN,
      };
      return this.errorResponses(errorRes, STATUSCODE.FAILED);
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }
}
