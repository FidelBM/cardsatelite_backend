import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './cards/cards.module';
import { envs } from './config/envs';
import { CartFormModule } from './cart-form/cart-form.module';
import { PrinterModule } from './printer/printer.module';
import { MailModule } from './mail/mail.module';
import { LimitTimeModule } from './limit-time/limit-time.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.db_host,
      port: envs.db_port,
      username: envs.db_username,
      password: envs.db_password,
      database: envs.db_database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    CardsModule,
    CartFormModule,
    PrinterModule,
    MailModule,
    LimitTimeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
