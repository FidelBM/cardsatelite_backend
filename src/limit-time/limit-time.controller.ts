import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LimitTimeService } from './limit-time.service';
import { CreateLimitTimeDto } from './dto/create-limit-time.dto';
import { UpdateLimitTimeDto } from './dto/update-limit-time.dto';

@Controller('limit-time')
export class LimitTimeController {
  constructor(private readonly limitTimeService: LimitTimeService) {}

  @Get()
  findOne() {
    return this.limitTimeService.findOne();
  }

  @Patch()
  update(@Body() updateLimitTimeDto: UpdateLimitTimeDto) {
    return this.limitTimeService.update(updateLimitTimeDto);
  }
}
