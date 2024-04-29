import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospitals } from './hospital.entity';
import { Repository } from 'typeorm';
import { FindHospitalDto, HospitalDto } from './hospital.dto';
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STATUSCODE,
} from '../../utils/message';
import { BaseService } from 'apps/abstracts';
import { IHospital, ROLES } from 'apps/utils/entities';
import { allowedFieldsToSortForHospitals } from './hospital.common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HospitalService extends BaseService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Hospitals)
    private readonly hospitalRepository: Repository<Hospitals>,
  ) {
    super();
  }

  /**create hospital
   *@param data, userRole
   *@description this function is used to create a hospital
   *@developedBy Vijaya Kumari
   */
  async createHospital(data: HospitalDto, userRole: ROLES) {
    try {
      // Check if the user has permission to create a hospital
      if (userRole !== ROLES.ADMIN && userRole !== ROLES.SUPER_ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_CREATE_HOSPITAL,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }

      //  checking if the hospital already exist or not with there hospitalId and email
      const existingHospital = await this.hospitalRepository.findOne({
        where: { hospitalId: data.hospitalId, email: data.email },
      });
      if (existingHospital) {
        return this._getBadRequestError(ERROR_MESSAGES.ALREADYEXIST(data.name));
      }

      //Hash the password before creating the user
      const hashedPassword = await bcrypt.hash(data.password, 15);
      data.password = hashedPassword;

      //   create the new hospital
      const created = this.hospitalRepository.create(data);

      // save the created hospital
      const saved = await this.hospitalRepository.save(created);

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

  /**get hospital
   *@description function to get hospital
   *@param id hospitalId
   *@param userRole
   *@developedBy Vijaya Kumari
   */

  async findHospitalById(id: string, userRole: ROLES) {
    try {
      // Check if the user has permission to get a hospital
      if (userRole !== ROLES.ADMIN && userRole !== ROLES.SUPER_ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_GET_HOSPITAL,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the hospital with the given id exist or not
      const foundHospital = await this.hospitalRepository.findOne({
        where: { id },
      });
      //if not found then return error
      if (!foundHospital) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //if found then return hospital
      const successRes = {
        foundHospital,
        message: SUCCESS_MESSAGES.CREATE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }
  /**update hospital
   *@description function to update the hospital
   *@param id hospitalId
   *@param data, userRole
   *@developedBy Vijaya Kumari
   */

  async updateHospital(data: HospitalDto, id: string, userRole) {
    try {
      // Check if the user has permission to update a hospital
      if (userRole !== ROLES.ADMIN && userRole !== ROLES.SUPER_ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_UPDATE_HOSPITAL,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the hospital exist or not of given id
      const foundHospital = await this.hospitalRepository.findOne({
        where: { id },
      });
      //if not then give error
      if (!foundHospital) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //updating hospital details
      const updateHospital = await this.hospitalRepository.preload({
        id,
        ...data,
      });
      //save the updated details of hospital
      const updatedHospital =
        await this.hospitalRepository.save(updateHospital);
      const successRes = {
        updatedHospital,
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

  /**delete  hospital
   *@description function to delete hospital
   *@param id hospitalId
   *@param userRole
   *@developedBy Vijaya Kumari
   */

  async deleteHospital(id: string, userRole) {
    try {
      // Check if the user has permission to delete a hospital
      if (userRole !== ROLES.ADMIN && userRole !== ROLES.SUPER_ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_DELETE_HOSPITAL,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the hospital exist or not of given id
      const foundHospital = await this.hospitalRepository.findOne({
        where: { id },
      });
      //if not found then give error
      if (!foundHospital) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //deleting the hospital
      const deletedHospital = await this.hospitalRepository.delete(id);
      const successRes = {
        deletedHospital,
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

  /**get listing of all hospital
   *@description function to get all hospital
   *@param data, userRole
   *@developedBy Vijaya Kumari
   */
  async getAll(data: FindHospitalDto, userRole) {
    try {
      // Check if the user has permission to get hospitals
      if (userRole !== ROLES.SUPER_ADMIN) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_GET_HOSPITAL,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      const qr = this.hospitalRepository.createQueryBuilder('hospital');
      qr.leftJoinAndSelect('hospital.healthCareWorker', 'healthCareWorker');
      qr.select([
        'hospital.id',
        'hospital.name',
        'hospital.email',
        'hospital.city',
        'hospital.state',
        'hospital.address',
        'hospital.role',
        'hospital.phoneNumber',
        'hospital.updatedAt',
        'healthCareWorker',
      ]);
      //sorting
      if (data.sort) {
        const param = this.buildSortParams<{
          name: string;
        }>(data.sort);
        if (allowedFieldsToSortForHospitals.includes(param[0])) {
          const KEYS = {
            name: `hospital.${param[0]}`,
          };
          // Order by key and parameter
          qr.orderBy(KEYS[param[0]], param[1]);
        }
      } else {
        qr.orderBy(`hospital.updatedAt`, 'DESC');
      }
      //pagination
      return await this._paginate<IHospital>(qr, {
        limit: data.limit || 10,
        page: data.page || 1,
      });
    } catch (error) {
      const errorRes = {
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes, STATUSCODE.BADREQUEST);
    }
  }

  /**get hospital by email
   *@description function to get hospital by email
   *@param email
   *@developedBy Vijaya Kumari
   */
  async findHospitalByEmail(email: string) {
    try {
      //check if the hospital with the given id exist or not
      const foundHospital = await this.hospitalRepository.findOne({
        where: { email },
      });
      //if not found then return error
      if (!foundHospital) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //if found then return hospital
      const successRes = {
        foundHospital,
        message: SUCCESS_MESSAGES.CREATE,
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
