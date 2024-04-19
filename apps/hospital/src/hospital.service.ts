import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from './hospital.entity';
import { Repository } from 'typeorm';
import { FindHospitalDto, HospitalDto } from './hospital.dto';
import { errorResponses, responses } from 'apps/utils/response';
import { MESSAGES, STATUSCODE } from '../../utils/message';
import { BaseService } from 'apps/abstracts';
import { IHospital } from 'apps/utils/entities';
import { allowedFieldsToSortForHospitals } from './hospital.common';

@Injectable()
export class HospitalService extends BaseService {
  constructor(
    @InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>,
  ) {
    super();
  }

  /**create hospital
   *@param data
   *@description this function is used to create a hospital
   */
  async createHospital(data: HospitalDto) {
    try {
      //checking if the hospital already exist or not with there hospitalId and email
      if (data?.hospitalId && data?.email) {
        const existingHospital = await this.hospitalRepository.findOne({
          where: { hospitalId: data.hospitalId, email: data.email },
        });
        if (existingHospital) {
          return this._getBadRequestError(MESSAGES.ALREADYEXIST(data.name));
        }
      }
      //if not then create the new hospital
      const created = this.hospitalRepository.create(data);
      //save the created hospital
      const saved = await this.hospitalRepository.save(created);
      //if saved then return success response
      const successRes = {
        saved,
        message: MESSAGES.CREATE,
      };
      return await responses(successRes, STATUSCODE.success);
      //if not saved then return error response
    } catch (error) {
      const errorRes = {
        message: MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.badRequest);
    }
  }

  /**get task hospital
   *@description function to get hospital
   *@param id hospitalId
   */

  async findHospitalById(id: string) {
    try {
      //check if the hospital with the given id exist or not
      const foundHospital = await this.hospitalRepository.findOne({
        where: { id },
      });
      //if not found then return error
      if (!foundHospital) {
        const errorRes = {
          message: MESSAGES.NOTEXIST,
        };
        return await errorResponses(errorRes, STATUSCODE.notFound);
      }
      //if found then return hospital
      const successRes = {
        foundHospital,
        message: MESSAGES.CREATE,
      };
      return await responses(successRes, STATUSCODE.success);
    } catch (error) {
      const errorRes = {
        message: MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.badRequest);
    }
  }
  /**update hospital
   *@description function to update the hospital
   *@param id hospitalId
   *@param data
   */

  async updateHospital(data: HospitalDto, id: string) {
    try {
      //check if the hospital exist or not of given id
      const foundHospital = await this.hospitalRepository.findOne({
        where: { id },
      });
      //if not then give error
      if (!foundHospital) {
        const errorRes = {
          message: MESSAGES.NOTEXIST,
        };
        return await errorResponses(errorRes, STATUSCODE.notFound);
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
        message: MESSAGES.UPDATE,
      };
      return await responses(successRes, STATUSCODE.success);
    } catch (error) {
      const errorRes = {
        message: MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.badRequest);
    }
  }

  /**delete  hospital
   *@description function to delete hospital
   *@param id hospitalId
   */

  async deleteHospital(id: string) {
    try {
      //check if the hospital exist or not of given id
      const foundHospital = await this.hospitalRepository.findOne({
        where: { id },
      });
      //if not found then give error
      if (!foundHospital) {
        const errorRes = {
          message: MESSAGES.NOTEXIST,
        };
        return await errorResponses(errorRes, STATUSCODE.notFound);
      }
      //deleting the hospital
      const deletedHospital = await this.hospitalRepository.delete(id);
      const successRes = {
        deletedHospital,
        message: MESSAGES.DELETE,
      };
      return await responses(successRes, STATUSCODE.success);
    } catch (error) {
      const errorRes = {
        message: MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.badRequest);
    }
  }

  /**get listing of all hospital
   *@description function to get all hospital
   *@param data
   */
  async getAll(data: FindHospitalDto) {
    try {
      const qr = this.hospitalRepository.createQueryBuilder('hospital');
      qr.select([
        'hospital.id',
        'hospital.name',
        'hospital.email',
        'hospital.city',
        'hospital.state',
        'hospital.address',
        'hospital.phoneNumber',
      ]);
      if (data.sort) {
        const param = this.buildSortParams<{
          name: string;
        }>(data.sort);
        if (allowedFieldsToSortForHospitals.includes(param[0])) {
          const KEYS = {
            name: `task.${param[0]}`,
          };
          // Order by key and parameter
          qr.orderBy(KEYS[param[0]], param[1]);
        }
      } else {
        qr.orderBy(`task.updatedAt`, 'DESC');
      }
      return await this._paginate<IHospital>(qr, {
        limit: data.limit || 10,
        page: data.page || 1,
      });
    } catch (error) {
      const errorRes = {
        message: MESSAGES.errorLog,
      };
      return await errorResponses(errorRes, STATUSCODE.badRequest);
    }
  }

  getHello(): string {
    return 'Hello World qwertyuiopasdfghjk';
  }
}
