import { PartialType } from '@nestjs/mapped-types';
import { CreateLimitTimeDto } from './create-limit-time.dto';

export class UpdateLimitTimeDto extends PartialType(CreateLimitTimeDto) {}
