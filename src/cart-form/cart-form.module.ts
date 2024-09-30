import { Module } from '@nestjs/common';
import { CartFormService } from './cart-form.service';
import { CartFormController } from './cart-form.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CartFormController],
  providers: [CartFormService],
  imports: [PrinterModule, TypeOrmModule.forFeature([User])],
})
export class CartFormModule {}
