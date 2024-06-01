import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'viaduct.proxy.rlwy.net',
      port: 59365,
      username: 'postgres',
      password: 'HPUINtrWVmRUNkudiCxhuaNcOUjyUxhe',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
