// weekly-report.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { WeeklyReportService } from './mail.service';
import { User } from 'src/users/user.entity';
import { Card } from 'src/cards/card.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([User, Card]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'fbonillamontalvo@gmail.com',
          pass: 'lcwp ojvl mdwl yjvp',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@tu-servidor.com>',
      },
    }),
  ],
  providers: [WeeklyReportService],
})
export class MailModule {}
