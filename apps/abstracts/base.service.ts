import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
  PaginationTypeEnum,
} from 'nestjs-typeorm-paginate';

export interface IErrorObject {
  [key: string]: string;
}
//base service common success and error message
export abstract class BaseService {
  protected createSuccessResponse(
    status?: number,
    message?: string,
    obj?: any,
  ) {
    return {
      status,
      message,
      data: obj,
    };
  }
  protected _getBadRequestError(message: string) {
    throw new BadRequestException({ message });
  }
  protected _getForbiddenError(message: IErrorObject | string) {
    throw new ForbiddenException({ message });
  }
  protected _getInternalServerError(message: string) {
    throw new InternalServerErrorException({ message });
  }

  //common function for sorting
  public buildSortParams<T extends object>(param: string) {
    if (typeof param === 'string') {
      const result = param?.match(/^-/);
      if (result) {
        const key = param.slice(1);
        return [key, 'DESC'] as [keyof T, 'DESC'];
      }
    }
    return [param, 'ASC'] as [keyof T, 'ASC'];
  }

  //common function to implement pagination
  protected async _paginate<T>(
    queryBuilder: SelectQueryBuilder<any>,
    { limit = 10, page = 1 }: IPaginationOptions,
  ): Promise<Pagination<T>> {
    const totalItems = await queryBuilder.getCount();
    return await paginate<T>(queryBuilder, {
      limit,
      page,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
        // Calculating the total of pages
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return {
          currentPage,
          itemCount,
          itemsPerPage,

          // Returning in this two row
          totalItems,
          totalPages: totalPages === 0 ? 1 : totalPages,
        };
      },
    });
  }

  responses = (data: object, statusCode: number, message = 'Success') => {
    return { statusCode, data, message };
  };
  //error response
  errorResponses = (errorRes: object, statusCode, message = 'Fail') => {
    return { errorRes, statusCode, message };
  };
}
