import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PDFDocument } from 'pdf-lib';
import { PrinterService } from 'src/printer/printer.service';
import { getHeader } from 'src/reports/name';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as pdfMake from 'pdfmake/build/pdfmake';

// Remove the assignment statement since 'vfs' is read-only

@Injectable()
export class CartFormService {
  constructor(
    private readonly printerService: PrinterService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getReport(user: User, year: number) {
    const birthDate = new Date(user.date_of_birth);
    birthDate.setDate(birthDate.getDate());
    const birthDateString = birthDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const baptismDate = new Date(user.date_of_baptism);
    baptismDate.setDate(baptismDate.getDate());
    const baptismDateString = baptismDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const cardData = {
      predSep: false,
      cursSep: 0,
      auxSep: false,
      hoursSep: 0,
      commentsSep: '',

      predOc: false,
      cursOc: 0,
      auxOc: false,
      hoursOc: 0,
      commentsOc: '',

      predNov: false,
      cursNov: 0,
      auxNov: false,
      hoursNov: 0,
      commentsNov: '',

      predDic: false,
      cursDic: 0,
      auxDic: false,
      hoursDic: 0,
      commentsDic: '',

      predEne: false,
      cursEne: 0,
      auxEne: false,
      hoursEne: 0,
      commentsEne: '',

      predFeb: false,
      cursFeb: 0,
      auxFeb: false,
      hoursFeb: 0,
      commentsFeb: '',

      predMar: false,
      cursMar: 0,
      auxMar: false,
      hoursMar: 0,
      commentsMar: '',

      predAbr: false,
      cursAbr: 0,
      auxAbr: false,
      hoursAbr: 0,
      commentsAbr: '',

      predMay: false,
      cursMay: 0,
      auxMay: false,
      hoursMay: 0,
      commentsMay: '',

      predJun: false,
      cursJun: 0,
      auxJun: false,
      hoursJun: 0,
      commentsJun: '',

      predJul: false,
      cursJul: 0,
      auxJul: false,
      hoursJul: 0,
      commentsJul: '',

      predAgo: false,
      cursAgo: 0,
      auxAgo: false,
      hoursAgo: 0,
      commentsAgo: '',
    };

    const currentYear = new Date(`${year}-01-01`).getFullYear() + 1;
    const previousYear = currentYear - 1;
    console.log(currentYear)

    user.cards.forEach((card) => {
      const cardDate = new Date(card.createdAt);
      const month = cardDate.getMonth();
      const year = cardDate.getFullYear();

      if (
        (year === previousYear && month >= 8) ||
        (year === currentYear && month <= 7)
      ) {
        switch (month) {
          case 0:
            cardData.predEne = card.predico;
            cardData.cursEne = card.cursos;
            cardData.auxEne = card.auxiliar;
            cardData.hoursEne = card.horas;
            cardData.commentsEne = card.comentarios;
            break;
          case 1:
            cardData.predFeb = card.predico;
            cardData.cursFeb = card.cursos;
            cardData.auxFeb = card.auxiliar;
            cardData.hoursFeb = card.horas;
            cardData.commentsFeb = card.comentarios;
            break;
          case 2:
            cardData.predMar = card.predico;
            cardData.cursMar = card.cursos;
            cardData.auxMar = card.auxiliar;
            cardData.hoursMar = card.horas;
            cardData.commentsMar = card.comentarios;
            break;
          case 3:
            cardData.predAbr = card.predico;
            cardData.cursAbr = card.cursos;
            cardData.auxAbr = card.auxiliar;
            cardData.hoursAbr = card.horas;
            cardData.commentsAbr = card.comentarios;
            break;
          case 4:
            cardData.predMay = card.predico;
            cardData.cursMay = card.cursos;
            cardData.auxMay = card.auxiliar;
            cardData.hoursMay = card.horas;
            cardData.commentsMay = card.comentarios;
            break;
          case 5:
            cardData.predJun = card.predico;
            cardData.cursJun = card.cursos;
            cardData.auxJun = card.auxiliar;
            cardData.hoursJun = card.horas;
            cardData.commentsJun = card.comentarios;
            break;
          case 6:
            cardData.predJul = card.predico;
            cardData.cursJul = card.cursos;
            cardData.auxJul = card.auxiliar;
            cardData.hoursJul = card.horas;
            cardData.commentsJul = card.comentarios;
            break;
          case 7:
            cardData.predAgo = card.predico;
            cardData.cursAgo = card.cursos;
            cardData.auxAgo = card.auxiliar;
            cardData.hoursAgo = card.horas;
            cardData.commentsAgo = card.comentarios;
            break;
          case 8:
            cardData.predSep = card.predico;
            cardData.cursSep = card.cursos;
            cardData.auxSep = card.auxiliar;
            cardData.hoursSep = card.horas;
            cardData.commentsSep = card.comentarios;
            break;
          case 9:
            cardData.predOc = card.predico;
            cardData.cursOc = card.cursos;
            cardData.auxOc = card.auxiliar;
            cardData.hoursOc = card.horas;
            cardData.commentsOc = card.comentarios;
            break;
          case 10:
            cardData.predNov = card.predico;
            cardData.cursNov = card.cursos;
            cardData.auxNov = card.auxiliar;
            cardData.hoursNov = card.horas;
            cardData.commentsNov = card.comentarios;
            break;
          case 11:
            cardData.predDic = card.predico;
            cardData.cursDic = card.cursos;
            cardData.auxDic = card.auxiliar;
            cardData.hoursDic = card.horas;
            cardData.commentsDic = card.comentarios;
            break;
        }
      }
    });

    const report = getHeader({
      name: user.fullName,
      birthDate: birthDateString,
      baptismDate: baptismDateString,
      roles: {
        elder: user.anciano,
        ministerialServant: user.siervo_ministerial,
        regularPioneer: user.precursorado === 'Precursor Regular',
        specialPioneer: user.precursorado === 'Precursor Especial',
        missionary: user.precursorado === 'Misionero',
        gender: user.genero,
        others: user.esperanza === 'Otras Ovejas',
        anointed: user.esperanza === 'Ungido',
      },
      card: cardData,
    });

    const doc = this.printerService.createPdf(report);

    return doc;
  }

  async generateReportsForAllUsers(year: number) {
    const users = await this.userRepository.find({ relations: ['cards'] });

    const documentDefinitions = users.map((user, index) => {
      const birthDate = new Date(user.date_of_birth);
      birthDate.setDate(birthDate.getDate());
      const birthDateString = birthDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const baptismDate = new Date(user.date_of_baptism);
      baptismDate.setDate(baptismDate.getDate());
      const baptismDateString = baptismDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const cardData = {
        predSep: false,
        cursSep: 0,
        auxSep: false,
        hoursSep: 0,
        commentsSep: '',

        predOc: false,
        cursOc: 0,
        auxOc: false,
        hoursOc: 0,
        commentsOc: '',

        predNov: false,
        cursNov: 0,
        auxNov: false,
        hoursNov: 0,
        commentsNov: '',

        predDic: false,
        cursDic: 0,
        auxDic: false,
        hoursDic: 0,
        commentsDic: '',

        predEne: false,
        cursEne: 0,
        auxEne: false,
        hoursEne: 0,
        commentsEne: '',

        predFeb: false,
        cursFeb: 0,
        auxFeb: false,
        hoursFeb: 0,
        commentsFeb: '',

        predMar: false,
        cursMar: 0,
        auxMar: false,
        hoursMar: 0,
        commentsMar: '',

        predAbr: false,
        cursAbr: 0,
        auxAbr: false,
        hoursAbr: 0,
        commentsAbr: '',

        predMay: false,
        cursMay: 0,
        auxMay: false,
        hoursMay: 0,
        commentsMay: '',

        predJun: false,
        cursJun: 0,
        auxJun: false,
        hoursJun: 0,
        commentsJun: '',

        predJul: false,
        cursJul: 0,
        auxJul: false,
        hoursJul: 0,
        commentsJul: '',

        predAgo: false,
        cursAgo: 0,
        auxAgo: false,
        hoursAgo: 0,
        commentsAgo: '',
      };

      const currentYear = new Date(`${year}-01-01`).getFullYear() + 1;
      const previousYear = currentYear - 1;

      user.cards.forEach((card) => {
        const cardDate = new Date(card.createdAt);
        const month = cardDate.getMonth();
        const year = cardDate.getFullYear();

        if (
          (year === previousYear && month >= 8) ||
          (year === currentYear && month <= 7)
        ) {
          switch (month) {
            case 0:
              cardData.predEne = card.predico;
              cardData.cursEne = card.cursos;
              cardData.auxEne = card.auxiliar;
              cardData.hoursEne = card.horas;
              cardData.commentsEne = card.comentarios;
              break;
            case 1:
              cardData.predFeb = card.predico;
              cardData.cursFeb = card.cursos;
              cardData.auxFeb = card.auxiliar;
              cardData.hoursFeb = card.horas;
              cardData.commentsFeb = card.comentarios;
              break;
            case 2:
              cardData.predMar = card.predico;
              cardData.cursMar = card.cursos;
              cardData.auxMar = card.auxiliar;
              cardData.hoursMar = card.horas;
              cardData.commentsMar = card.comentarios;
              break;
            case 3:
              cardData.predAbr = card.predico;
              cardData.cursAbr = card.cursos;
              cardData.auxAbr = card.auxiliar;
              cardData.hoursAbr = card.horas;
              cardData.commentsAbr = card.comentarios;
              break;
            case 4:
              cardData.predMay = card.predico;
              cardData.cursMay = card.cursos;
              cardData.auxMay = card.auxiliar;
              cardData.hoursMay = card.horas;
              cardData.commentsMay = card.comentarios;
              break;
            case 5:
              cardData.predJun = card.predico;
              cardData.cursJun = card.cursos;
              cardData.auxJun = card.auxiliar;
              cardData.hoursJun = card.horas;
              cardData.commentsJun = card.comentarios;
              break;
            case 6:
              cardData.predJul = card.predico;
              cardData.cursJul = card.cursos;
              cardData.auxJul = card.auxiliar;
              cardData.hoursJul = card.horas;
              cardData.commentsJul = card.comentarios;
              break;
            case 7:
              cardData.predAgo = card.predico;
              cardData.cursAgo = card.cursos;
              cardData.auxAgo = card.auxiliar;
              cardData.hoursAgo = card.horas;
              cardData.commentsAgo = card.comentarios;
              break;
            case 8:
              cardData.predSep = card.predico;
              cardData.cursSep = card.cursos;
              cardData.auxSep = card.auxiliar;
              cardData.hoursSep = card.horas;
              cardData.commentsSep = card.comentarios;
              break;
            case 9:
              cardData.predOc = card.predico;
              cardData.cursOc = card.cursos;
              cardData.auxOc = card.auxiliar;
              cardData.hoursOc = card.horas;
              cardData.commentsOc = card.comentarios;
              break;
            case 10:
              cardData.predNov = card.predico;
              cardData.cursNov = card.cursos;
              cardData.auxNov = card.auxiliar;
              cardData.hoursNov = card.horas;
              cardData.commentsNov = card.comentarios;
              break;
            case 11:
              cardData.predDic = card.predico;
              cardData.cursDic = card.cursos;
              cardData.auxDic = card.auxiliar;
              cardData.hoursDic = card.horas;
              cardData.commentsDic = card.comentarios;
              break;
          }
        }
      });

      const userReport = getHeader({
        name: user.fullName,
        birthDate: birthDateString,
        baptismDate: baptismDateString,
        roles: {
          elder: user.anciano,
          ministerialServant: user.siervo_ministerial,
          regularPioneer: user.precursorado === 'Precursor Regular',
          specialPioneer: user.precursorado === 'Precursor Especial',
          missionary: user.precursorado === 'Misionero',
          gender: user.genero,
          others: user.esperanza === 'Otras Ovejas',
          anointed: user.esperanza === 'Ungido',
        },
        card: cardData,
      });

      if (index < users.length - 1) {
        if (!Array.isArray(userReport.content)) {
          userReport.content = [];
        }
        userReport.content.push({ text: '', pageBreak: 'after' });
      }

      return userReport;
    });

    const combinedDocumentDefinition = {
      content: documentDefinitions.flatMap((doc) => doc.content),
    };

    const doc = this.printerService.createPdfBuffer(combinedDocumentDefinition);

    return doc;
  }

  async generateReportsForPrecursora(year: number) {
    const users = await this.userRepository.find({
      relations: ['cards'],
      where: { precursorado: 'Precursor Regular' },
    });

    const documentDefinitions = users.map((user, index) => {
      const birthDate = new Date(user.date_of_birth);
      birthDate.setDate(birthDate.getDate());
      const birthDateString = birthDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const baptismDate = new Date(user.date_of_baptism);
      baptismDate.setDate(baptismDate.getDate());
      const baptismDateString = baptismDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const cardData = {
        predSep: false,
        cursSep: 0,
        auxSep: false,
        hoursSep: 0,
        commentsSep: '',

        predOc: false,
        cursOc: 0,
        auxOc: false,
        hoursOc: 0,
        commentsOc: '',

        predNov: false,
        cursNov: 0,
        auxNov: false,
        hoursNov: 0,
        commentsNov: '',

        predDic: false,
        cursDic: 0,
        auxDic: false,
        hoursDic: 0,
        commentsDic: '',

        predEne: false,
        cursEne: 0,
        auxEne: false,
        hoursEne: 0,
        commentsEne: '',

        predFeb: false,
        cursFeb: 0,
        auxFeb: false,
        hoursFeb: 0,
        commentsFeb: '',

        predMar: false,
        cursMar: 0,
        auxMar: false,
        hoursMar: 0,
        commentsMar: '',

        predAbr: false,
        cursAbr: 0,
        auxAbr: false,
        hoursAbr: 0,
        commentsAbr: '',

        predMay: false,
        cursMay: 0,
        auxMay: false,
        hoursMay: 0,
        commentsMay: '',

        predJun: false,
        cursJun: 0,
        auxJun: false,
        hoursJun: 0,
        commentsJun: '',

        predJul: false,
        cursJul: 0,
        auxJul: false,
        hoursJul: 0,
        commentsJul: '',

        predAgo: false,
        cursAgo: 0,
        auxAgo: false,
        hoursAgo: 0,
        commentsAgo: '',
      };

      const currentYear = new Date(`${year}-01-01`).getFullYear() + 1;
      const previousYear = currentYear - 1;
      user.cards.forEach((card) => {
        const cardDate = new Date(card.createdAt);
        const month = cardDate.getMonth();
        const year = cardDate.getFullYear();

        if (
          (year === previousYear && month >= 8) ||
          (year === currentYear && month <= 7)
        ) {
          switch (month) {
            case 0:
              cardData.predEne = card.predico;
              cardData.cursEne = card.cursos;
              cardData.auxEne = card.auxiliar;
              cardData.hoursEne = card.horas;
              cardData.commentsEne = card.comentarios;
              break;
            case 1:
              cardData.predFeb = card.predico;
              cardData.cursFeb = card.cursos;
              cardData.auxFeb = card.auxiliar;
              cardData.hoursFeb = card.horas;
              cardData.commentsFeb = card.comentarios;
              break;
            case 2:
              cardData.predMar = card.predico;
              cardData.cursMar = card.cursos;
              cardData.auxMar = card.auxiliar;
              cardData.hoursMar = card.horas;
              cardData.commentsMar = card.comentarios;
              break;
            case 3:
              cardData.predAbr = card.predico;
              cardData.cursAbr = card.cursos;
              cardData.auxAbr = card.auxiliar;
              cardData.hoursAbr = card.horas;
              cardData.commentsAbr = card.comentarios;
              break;
            case 4:
              cardData.predMay = card.predico;
              cardData.cursMay = card.cursos;
              cardData.auxMay = card.auxiliar;
              cardData.hoursMay = card.horas;
              cardData.commentsMay = card.comentarios;
              break;
            case 5:
              cardData.predJun = card.predico;
              cardData.cursJun = card.cursos;
              cardData.auxJun = card.auxiliar;
              cardData.hoursJun = card.horas;
              cardData.commentsJun = card.comentarios;
              break;
            case 6:
              cardData.predJul = card.predico;
              cardData.cursJul = card.cursos;
              cardData.auxJul = card.auxiliar;
              cardData.hoursJul = card.horas;
              cardData.commentsJul = card.comentarios;
              break;
            case 7:
              cardData.predAgo = card.predico;
              cardData.cursAgo = card.cursos;
              cardData.auxAgo = card.auxiliar;
              cardData.hoursAgo = card.horas;
              cardData.commentsAgo = card.comentarios;
              break;
            case 8:
              cardData.predSep = card.predico;
              cardData.cursSep = card.cursos;
              cardData.auxSep = card.auxiliar;
              cardData.hoursSep = card.horas;
              cardData.commentsSep = card.comentarios;
              break;
            case 9:
              cardData.predOc = card.predico;
              cardData.cursOc = card.cursos;
              cardData.auxOc = card.auxiliar;
              cardData.hoursOc = card.horas;
              cardData.commentsOc = card.comentarios;
              break;
            case 10:
              cardData.predNov = card.predico;
              cardData.cursNov = card.cursos;
              cardData.auxNov = card.auxiliar;
              cardData.hoursNov = card.horas;
              cardData.commentsNov = card.comentarios;
              break;
            case 11:
              cardData.predDic = card.predico;
              cardData.cursDic = card.cursos;
              cardData.auxDic = card.auxiliar;
              cardData.hoursDic = card.horas;
              cardData.commentsDic = card.comentarios;
              break;
          }
        }
      });

      const userReport = getHeader({
        name: user.fullName,
        birthDate: birthDateString,
        baptismDate: baptismDateString,
        roles: {
          elder: user.anciano,
          ministerialServant: user.siervo_ministerial,
          regularPioneer: user.precursorado === 'Precursor Regular',
          specialPioneer: user.precursorado === 'Precursor Especial',
          missionary: user.precursorado === 'Misionero',
          gender: user.genero,
          others: user.esperanza === 'Otras Ovejas',
          anointed: user.esperanza === 'Ungido',
        },
        card: cardData,
      });

      if (index < users.length - 1) {
        if (!Array.isArray(userReport.content)) {
          userReport.content = [];
        }
        userReport.content.push({ text: '', pageBreak: 'after' });
      }

      return userReport;
    });

    const combinedDocumentDefinition = {
      content: documentDefinitions.flatMap((doc) => doc.content),
    };

    const doc = this.printerService.createPdfBuffer(combinedDocumentDefinition);

    return doc;
  }
}
