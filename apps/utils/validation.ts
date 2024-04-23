
// yup-validation.pipe.ts
import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Schema, ValidationError } from 'yup';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: Schema<any>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value, { abortEarly: false });
      return value;
    } catch (errors) {
      throw new BadRequestException(this.formatErrors(errors));
    }
  }

  private formatErrors(errors: ValidationError) {
    return errors.inner.map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }
}