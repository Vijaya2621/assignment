import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'apps/abstracts';
import { FindPatientDto, PatientDto } from './patient.dto';
import { IPatient, ROLES } from 'apps/utils/entities';
import {
  ERROR_MESSAGES,
  STATUSCODE,
  SUCCESS_MESSAGES,
} from 'apps/utils/message';
import * as bcrypt from 'bcrypt';
import { allowedFieldsToSortForPatients } from 'apps/utils/common';

@Injectable()
export class PatientService extends BaseService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
    super();
  }
  getHello(): string {
    return 'Hello patient!';
  }

  /**create patient
   * @description this function is used to create a patient
   * @param data
   * @param userRole
   * @developedBy Vijaya Kumari
   */
  async createPatient(data: PatientDto, userRole: ROLES) {
    try {
      // Check if the user has permission to create a patient
      if (userRole == ROLES.HEALTHCARE_WORKER || userRole == ROLES.PATIENT) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_CREATE_PATIENT,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }

      //checking if the patient already exist or not with there email
      const existingPatient = await this.patientRepository.findOne({
        where: { email: data.email },
      });
      if (existingPatient) {
        return this._getBadRequestError(ERROR_MESSAGES.ALREADYEXIST(data.name));
      }

      //Hash the password before creating the user
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      //create the patient
      const createdPatient = await this.patientRepository.create(
        data as unknown as Patient,
      );
      // save the created patient
      const savedPatient = await this.patientRepository.save(createdPatient);
      //  if saved then return success response
      const successRes = {
        savedPatient,
        message: SUCCESS_MESSAGES.CREATE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
      // if not saved then return error response
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes.error.message, STATUSCODE.BADREQUEST);
    }
  }

  /**find patient
   * @description this function is used to find a patient by their id
   * @param id patientId
   * @param userRole
   * @developedBy Vijaya Kumari
   */

  async findPatientById(id: string, userRole: ROLES) {
    try {
      // Check if the user has permission to get a patient
      if (userRole == ROLES.PATIENT) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_GET_PATIENT,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the patient with the given id exist or not
      const foundPatient = await this.patientRepository.findOne({
        where: { id },
      });
      //if not found then return error
      if (!foundPatient) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //if found then return patient
      const successRes = {
        foundPatient,
        message: SUCCESS_MESSAGES.CREATE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes.error.message, STATUSCODE.BADREQUEST);
    }
  }

  /**update patient
   *@description function to update the patient
   *@param id patientId
   *@param data, userRole
   *@developedBy Vijaya Kumari
   */

  async updatePatient(data: PatientDto, id: string, userRole) {
    try {
      // Check if the user has permission to update a patient
      if (userRole == ROLES.HEALTHCARE_WORKER || userRole == ROLES.PATIENT) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_UPDATE_PATIENT,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the patient exist or not of given id
      const foundPatient = await this.patientRepository.findOne({
        where: { id },
      });
      //if not then give error
      if (!foundPatient) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //updating patient details
      const updatePatient = await this.patientRepository.preload({
        id,
        ...data,
      } as unknown as Patient);
      //save the updated details of patient
      const updatedPatient = await this.patientRepository.save(updatePatient);
      const successRes = {
        updatedPatient,
        message: SUCCESS_MESSAGES.UPDATE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes.error.message, STATUSCODE.BADREQUEST);
    }
  }

  /**delete  patient
   *@description function to delete patient
   *@param id patientId
   *@param userRole
   *@developedBy Vijaya Kumari
   */

  async deletePatient(id: string, userRole) {
    try {
      // Check if the user has permission to delete a patient
      if (userRole !== ROLES.PATIENT || userRole == ROLES.PATIENT) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_DELETE_PATIENT,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      //check if the patient exist or not of given id
      const foundPatient = await this.patientRepository.findOne({
        where: { id },
      });
      //if not found then give error
      if (!foundPatient) {
        const errorRes = {
          message: ERROR_MESSAGES.NOTEXIST,
        };
        return this.errorResponses(errorRes, STATUSCODE.NOTFOUND);
      }
      //deleting the patient
      const deletedPatient = await this.patientRepository.delete(id);
      const successRes = {
        deletedPatient,
        message: SUCCESS_MESSAGES.DELETE,
      };
      return this.responses(successRes, STATUSCODE.SUCCESS);
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes.error.message, STATUSCODE.BADREQUEST);
    }
  }

  /**get listing of all patient
   *@description function to get all patient
   *@param data, userRole
   *@developedBy Vijaya Kumari
   */
  async getAll(data: FindPatientDto, userRole) {
    try {
      debugger;
      // Check if the user has permission to get patients
      if (userRole == ROLES.PATIENT) {
        // If not, return an error indicating insufficient permissions
        const errorRes = {
          message: ERROR_MESSAGES.PERMISSION_DENIED_TO_GET_PATIENT,
        };
        return this.errorResponses(errorRes, STATUSCODE.UNAUTHORIZED);
      }
      const qr = this.patientRepository.createQueryBuilder('patient');
      qr.leftJoinAndSelect('patient.healthCareWorker', 'healthCareWorker');
      qr.leftJoinAndSelect('patient.notes', 'notes');
      qr.select([
        'patient.id',
        'patient.image',
        'patient.active',
        'patient.role',
        'patient.email',
        'patient.condition',
        'patient.name',
        'patient.phoneNumber',
        'patient.dateOfBirth',
        'patient.education',
        'patient.enrolledDate',
        'patient.height',
        'patient.weight',
        'patient.gender',
        'patient.updatedAt',
        'notes',
        'healthCareWorker.id',
        'healthCareWorker.name',
        'healthCareWorker.specialization',
        'healthCareWorker.email',
        'healthCareWorker.phoneNumber',
      ]);
      //sorting
      if (data.sort) {
        const param = this.buildSortParams<{
          name: string;
        }>(data.sort);
        if (allowedFieldsToSortForPatients.includes(param[0])) {
          const KEYS = {
            name: `patient.${param[0]}`,
          };
          // Order by key and parameter
          qr.orderBy(KEYS[param[0]], param[1]);
        }
      } else {
        qr.orderBy(`patient.updatedAt`, 'DESC');
      }
      //pagination
      return await this._paginate<IPatient>(qr, {
        limit: data.limit || 10,
        page: data.page || 1,
      });
    } catch (error) {
      const errorRes = {
        error,
        message: ERROR_MESSAGES.errorLog,
      };
      return this.errorResponses(errorRes.error.message, STATUSCODE.BADREQUEST);
    }
  }
}
