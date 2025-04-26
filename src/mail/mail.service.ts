// weekly-report.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parser as Json2csvParser } from 'json2csv';
import { MailerService } from '@nestjs-modules/mailer';
import { Between } from 'typeorm';

import { User } from 'src/users/user.entity';
import { Card } from 'src/cards/card.entity';

@Injectable()
export class WeeklyReportService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly mailerService: MailerService,
  ) {}

  @Cron('0 0 15 * *')
  async sendMonthlySummary(): Promise<void> {
    // Fecha actual y determinación del mes actual
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = enero, 11 = diciembre

    // Definimos el inicio y fin del mes actual
    const startOfMonth = new Date(year, month, 1, 0, 0, 0);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59);

    // Obtenemos las cards creadas en el mes actual, incluyendo la relación con el usuario
    const cards = await this.cardRepository.find({
      where: {
        createdAt: Between(startOfMonth, endOfMonth),
      },
      relations: ['user'],
    });

    /*  
      Para contar usuarios únicos por grupo y acumular los valores,
      creamos una estructura de agregación:
        groupUsers: {
          [group]: {
            [userId]: {
              fullName: string,
              courses: number,
              hours: number,
              reported: boolean
            }
          }
        }
    */
    const groupUsers: {
      [group: string]: {
        [userId: number]: {
          fullName: string;
          courses: number;
          hours: number;
          reported: boolean;
        };
      };
    } = {
      'Precursor Regular': {},
      'Precursor Auxiliar': {},
      Publicador: {},
    };

    // Procesamos cada card para agrupar por usuario y acumular cursos y horas
    cards.forEach((card) => {
      // Si no existe el usuario, se omite la card
      if (!card.user) return;

      // Determinamos el grupo según la información del usuario y la card
      let group = 'Publicador';
      if (card.user.precursorado === 'Precursor Regular') {
        group = 'Precursor Regular';
      } else if (card.auxiliar === true) {
        group = 'Precursor Auxiliar';
      }

      const userId = card.user.id;

      // Si es la primera card del usuario en este grupo, inicializamos el acumulador
      if (!groupUsers[group][userId]) {
        groupUsers[group][userId] = {
          fullName: card.user.fullName,
          courses: 0,
          hours: 0,
          reported: false,
        };
      }

      // Acumulamos cursos y horas (si los valores son nulos, se consideran 0)
      groupUsers[group][userId].courses += card.cursos ?? 0;
      groupUsers[group][userId].hours += card.horas ?? 0;

      // Se considera que el usuario "informó" si la card tiene valor en cursos o en horas
      if (card.cursos != null || card.horas != null) {
        groupUsers[group][userId].reported = true;
      }
    });

    // Calculamos el resumen para cada grupo basado en usuarios únicos
    type GroupSummary = {
      totalUsers: number;
      reportedUsers: number;
      sumCourses: number;
      sumHours: number;
      avgCourses: number;
      avgHours: number;
    };

    const summary: { [group: string]: GroupSummary } = {};

    Object.keys(groupUsers).forEach((group) => {
      const usersInGroup = groupUsers[group];
      const totalUsers = Object.keys(usersInGroup).length;
      let reportedUsers = 0;
      let sumCourses = 0;
      let sumHours = 0;

      // Se recorre cada usuario único del grupo
      for (const userId in usersInGroup) {
        const agg = usersInGroup[userId];
        if (agg.reported) {
          reportedUsers++;
          sumCourses += agg.courses;
          sumHours += agg.hours;
        }
      }
      const avgCourses = reportedUsers > 0 ? sumCourses / reportedUsers : 0;
      const avgHours = reportedUsers > 0 ? sumHours / reportedUsers : 0;

      summary[group] = {
        totalUsers,
        reportedUsers,
        sumCourses,
        sumHours,
        avgCourses,
        avgHours,
      };
    });

    // Preparamos el texto resumen para incluir en el cuerpo del correo
    let summaryText = `Resumen de Cards para ${month + 1}/${year}\n\n`;
    Object.keys(summary).forEach((group) => {
      const data = summary[group];
      summaryText += `${group}:\n`;
      summaryText += `  - Usuarios que informaron: ${data.reportedUsers}\n`;
      summaryText += `  - Suma de cursos: ${data.sumCourses}\n`;
      summaryText += `  - Promedio de cursos: ${data.avgCourses.toFixed(2)}\n`;
      summaryText += `  - Suma de horas: ${data.sumHours}\n`;
      summaryText += `  - Promedio de horas: ${data.avgHours.toFixed(2)}\n\n`;
    });

    // Generamos el CSV con el detalle de las cards del mes (por card)
    const cardRecords = cards.map((card) => ({
      nombre: card.user ? card.user.fullName : '',
      horas: card.horas,
      cursos: card.cursos,
      comentarios: card.comentarios,
      predico: card.predico,
      // Se agrega la clasificación (grupo) para facilitar la revisión
      grupo:
        card.user && card.user.precursorado === 'Precursor Regular'
          ? 'Precursor Regular'
          : card.auxiliar
            ? 'Precursor Auxiliar'
            : 'Publicador',
    }));

    const csvParser = new Json2csvParser();
    const csv = csvParser.parse(cardRecords);

    // Enviamos el correo con el resumen en el cuerpo y el CSV adjunto
    await this.mailerService.sendMail({
      to: 'fbonillar@gmail.com', // Reemplaza por el o los destinatarios deseados
      subject: `Resumen Mensual de Cards - ${month + 1}/${year}`,
      text: summaryText,
      attachments: [
        {
          filename: `cards_${year}_${month + 1}.csv`,
          content: csv,
        },
      ],
    });
  }

  // Se programa la tarea para que se ejecute cada domingo a la medianoche
  @Cron(CronExpression.EVERY_WEEK)
  async sendWeeklyReport(): Promise<void> {
    // Obtenemos todos los usuarios y tarjetas de la base de datos
    const users = await this.userRepository.find();
    const cards = await this.cardRepository.find();

    // Preparamos los registros para el CSV de usuarios
    const userRecords = users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      date_of_birth: user.date_of_birth,
      date_of_baptism: user.date_of_baptism,
      esperanza: user.esperanza,
      anciano: user.anciano,
      siervo_ministerial: user.siervo_ministerial,
      genero: user.genero,
      precursorado: user.precursorado,
      grupo: user.grupo,
      sg: user.sg,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    // Preparamos los registros para el CSV de tarjetas
    const cardRecords = cards.map((card) => ({
      id: card.id,
      horas: card.horas,
      comentarios: card.comentarios,
      cursos: card.cursos,
      predico: card.predico,
      auxiliar: card.auxiliar,
      createdAt: card.createdAt,
      userId: card.userId,
    }));

    // Convertimos los registros a CSV utilizando json2csv
    const userCsvParser = new Json2csvParser();
    const userCsv = userCsvParser.parse(userRecords);

    const cardCsvParser = new Json2csvParser();
    const cardCsv = cardCsvParser.parse(cardRecords);

    // Enviamos el correo con los archivos adjuntos
    await this.mailerService.sendMail({
      to: 'aleyiya09@gmail.com', // Reemplaza con el correo del destinatario
      subject: 'Reporte Semanal - Usuarios y Tarjetas',
      text: 'Adjunto encontrarás dos archivos CSV con los datos de usuarios y tarjetas.',
      attachments: [
        {
          filename: 'usuarios.csv',
          content: userCsv,
        },
        {
          filename: 'tarjetas.csv',
          content: cardCsv,
        },
      ],
    });
  }
}
