import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, CustomTableLayout, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Buffer } from 'buffer'; // Asegúrate de que estás importando el Buffer correctamente

const fonts = {
  Roboto: {
    normal: `${__dirname}/../../fonts/Roboto-Regular.ttf`,
    bold: `${__dirname}/../../fonts/Roboto-Bold.ttf`,
    medium: `${__dirname}/../../fonts/Roboto-Medium.ttf`,
    italics: `${__dirname}/../../fonts/Roboto-Italic.ttf`,
    bolditalics: `${__dirname}/../../fonts/Roboto-MediumItalic.ttf`,
  },
};

const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: function () {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#bbbbbb';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    fillColor: function (i, node) {
      if (i === 0) {
        return '#7b90be';
      }
      if (i === node.table.body.length - 1) {
        return '#acb3c1';
      }
      return i % 2 === 0 ? '#f3f3f3' : null;
    },
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts,
    },
  ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }

  async createPdfBuffer(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts,
    },
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const pdfDoc = this.createPdf(docDefinition, options);
      const chunks: Uint8Array[] = []; // Cambiar el tipo explícitamente a Uint8Array[]

      pdfDoc.on('data', (chunk: Uint8Array) => {
        chunks.push(chunk); // Asegurarse de que los chunks sean Uint8Array
      });

      pdfDoc.on('end', () => {
        const result = Buffer.concat(chunks); // Concatenamos los chunks como un Buffer
        resolve(result); // Devolvemos el Buffer como resultado de la promesa
      });

      pdfDoc.on('error', (err) => {
        reject(err); // Manejamos errores que ocurran en la creación del PDF
      });

      pdfDoc.end(); // Terminamos el flujo del documento PDF
    });
  }
}
