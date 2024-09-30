import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { CartFormService } from './cart-form.service';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Controller('cart-form')
export class CartFormController {
  constructor(
    private readonly cartFormService: CartFormService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  @Get('combined/:year')
  async getFull(
    @Res() response: Response,
    @Param('year', ParseIntPipe) year: number,
  ) {
    try {
      // Llama a generateReportsForAllUsers que debe devolver una promesa con el buffer PDF
      const pdfBuffer =
        await this.cartFormService.generateReportsForAllUsers(year);

      // Configura los encabezados para la respuesta
      response.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=congregacion-satelite.pdf`,
        'Content-Length': pdfBuffer.length,
      });

      // Envía el PDF como una respuesta
      response.end(pdfBuffer);
      // Redirige a la página principal
      response.redirect('http://localhost:3000/dashboard/tables');
    } catch (error) {
      // Maneja los errores de manera apropiada
      console.error('Error generando el PDF:', error);
      response.status(500).send('Error generando el PDF');
    }
  }

  @Get('combined/precursor/:year')
  async getFullPrecursor(
    @Res() response: Response,
    @Param('year', ParseIntPipe) year: number,
  ) {
    try {
      // Llama a generateReportsForAllUsers que debe devolver una promesa con el buffer PDF
      const pdfBuffer =
        await this.cartFormService.generateReportsForPrecursora(year);

      // Configura los encabezados para la respuesta
      response.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=precursores.pdf`,
        'Content-Length': pdfBuffer.length,
      });

      // Envía el PDF como una respuesta
      response.end(pdfBuffer);
      // Redirige a la página principal
      response.redirect('http://localhost:3000/dashboard/tables');
    } catch (error) {
      // Maneja los errores de manera apropiada
      console.error('Error generando el PDF:', error);
      response.status(500).send('Error generando el PDF');
    }
  }

  @Get('header/:id/:year')
  async getHelloWorldReport(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
    @Param('year', ParseIntPipe) year: number,
  ) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['cards'],
    });

    const pdfDoc = this.cartFormService.getReport(userFound, year);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Reporte de prueba';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
