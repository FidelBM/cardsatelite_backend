import { Module } from '@nestjs/common';
import { LimitTimeService } from './limit-time.service';
import { LimitTimeController } from './limit-time.controller';
import { LimitTime } from './entities/limit-time.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LimitTime])],
  controllers: [LimitTimeController],
  providers: [LimitTimeService],
})
export class LimitTimeModule {}
