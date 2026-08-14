import { PipeTransform, BadRequestException } from '@nestjs/common';
import { flattenError, type ZodType } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(flattenError(result.error));
    }

    return result.data;
  }
}
