import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLimitTimeDto } from './dto/create-limit-time.dto';
import { UpdateLimitTimeDto } from './dto/update-limit-time.dto';
import { LimitTime } from './entities/limit-time.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LimitTimeService {
  constructor(
    @InjectRepository(LimitTime) private limitRepository: Repository<LimitTime>,
  ) {}

  @Cron('0 0 1 * *')
  async create(createLimitTimeDto: CreateLimitTimeDto) {
    const id = 1;
    const limitFound = await this.limitRepository.findOne({
      where: {
        id,
      },
    });

    if (!limitFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    limitFound.boolean = true;
    return this.limitRepository.save(limitFound);
  }

  async findOne() {
    const id = 1;

    const limitFound = await this.limitRepository.findOne({
      where: {
        id,
      },
    });

    if (!limitFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return limitFound;
  }

  async update(updateLimitTimeDto: UpdateLimitTimeDto) {
    const id = 1;
    const limitFound = await this.limitRepository.findOne({
      where: {
        id,
      },
    });

    if (!limitFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(limitFound, updateLimitTimeDto);

    return this.limitRepository.save(updateUser);
  }

  remove(id: number) {
    return `This action removes a #${id} limitTime`;
  }
}
