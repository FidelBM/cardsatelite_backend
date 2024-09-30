import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
  birthDate: string;
  baptismDate: string;
  roles: {
    elder: boolean;
    ministerialServant: boolean;
    regularPioneer: boolean;
    specialPioneer: boolean;
    missionary: boolean;
    gender: string;
    others: boolean;
    anointed: boolean;
  };
  card: {
    predSep: boolean;
    cursSep: number;
    auxSep: boolean;
    hoursSep: number;
    commentsSep: string;

    predOc: boolean;
    cursOc: number;
    auxOc: boolean;
    hoursOc: number;
    commentsOc: string;

    predNov: boolean;
    cursNov: number;
    auxNov: boolean;
    hoursNov: number;
    commentsNov: string;

    predDic: boolean;
    cursDic: number;
    auxDic: boolean;
    hoursDic: number;
    commentsDic: string;

    predEne: boolean;
    cursEne: number;
    auxEne: boolean;
    hoursEne: number;
    commentsEne: string;

    predFeb: boolean;
    cursFeb: number;
    auxFeb: boolean;
    hoursFeb: number;
    commentsFeb: string;

    predMar: boolean;
    cursMar: number;
    auxMar: boolean;
    hoursMar: number;
    commentsMar: string;

    predAbr: boolean;
    cursAbr: number;
    auxAbr: boolean;
    hoursAbr: number;
    commentsAbr: string;

    predMay: boolean;
    cursMay: number;
    auxMay: boolean;
    hoursMay: number;
    commentsMay: string;

    predJun: boolean;
    cursJun: number;
    auxJun: boolean;
    hoursJun: number;
    commentsJun: string;

    predJul: boolean;
    cursJul: number;
    auxJul: boolean;
    hoursJul: number;
    commentsJul: string;

    predAgo: boolean;
    cursAgo: number;
    auxAgo: boolean;
    hoursAgo: number;
    commentsAgo: string;
  };
}

const checkedImage = 'image/checkbox-do.jpg';
const uncheckedImage = 'image/checkbox-un.jpg';

export const getHeader = (options: ReportOptions): TDocumentDefinitions => {
  const { name, birthDate, baptismDate, roles, card } = options;

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: 'REGISTRO DE PUBLICADOR DE LA CONGREGACIÓN',
        fontSize: 18,
        bold: true,
        marginBottom: 15,
        alignment: 'center',
      },
      {
        columns: [
          { width: '70%', text: [{ text: 'Nombre: ', bold: true }, name] },
          {
            width: '17%',
            columns: [
              {
                image:
                  roles.gender === 'Hombre' ? checkedImage : uncheckedImage,
                fit: [10, 10],
                margin: [0, 0, 0, 0], // Sin margen en la imagen
              },
              {
                text: 'Hombre',
                alignment: 'left',
                margin: [0, 0, 0, 0], // Sin margen en el texto
              },
            ],
            columnGap: -60,
          },
          {
            width: '13%',
            columns: [
              {
                image: roles.gender === 'Mujer' ? checkedImage : uncheckedImage,
                fit: [10, 10],
                margin: [0, 0, 0, 0], // Sin margen en la imagen
              },
              {
                text: 'Mujer',
                alignment: 'left',
                margin: [0, 0, 0, 0], // Sin margen en el texto
              },
            ],
            columnGap: -40,
          },
        ],
        marginBottom: 10,
      },
      {
        columns: [
          {
            width: '70%',
            text: [{ text: 'Fecha de nacimiento: ', bold: true }, birthDate],
          },
          {
            width: '17%',
            columns: [
              {
                image: roles.others ? checkedImage : uncheckedImage,
                fit: [9, 10],
                margin: [0, 0, 0, 0], // Sin margen en la imagen
              },
              {
                text: 'Otras ovejas',
                alignment: 'left',
                margin: [0, 0, 0, 0], // Sin margen en el texto
              },
            ],
            columnGap: -60,
          },
          {
            width: '13%',
            columns: [
              {
                image: roles.anointed ? checkedImage : uncheckedImage,
                fit: [9, 10],
                margin: [0, 0, 0, 0], // Sin margen en la imagen
              },
              {
                text: 'Ungidos',
                alignment: 'left',
                margin: [0, 0, 0, 0], // Sin margen en el texto
              },
            ],
            columnGap: -40,
          },
        ],
        marginBottom: 10,
      },
      {
        columns: [
          {
            width: '50%',
            text: [{ text: 'Fecha de bautismo: ', bold: true }, baptismDate],
          },
          { width: '50%', text: '' },
        ],
        marginBottom: 15,
      },
      {
        // Roles section with checkboxes
        table: {
          widths: ['20%', '20%', '20%', '20%', '20%'],
          body: [
            [
              {
                columns: [
                  {
                    image: roles.elder ? checkedImage : uncheckedImage,
                    fit: [10, 10],
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: 'Anciano',
                    alignment: 'left',
                    margin: [0, 0, 0, 0],
                  },
                ],
                columnGap: -70,
              },
              {
                columns: [
                  {
                    image: roles.ministerialServant
                      ? checkedImage
                      : uncheckedImage,
                    fit: [10, 10],
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: 'Siervo ministerial',
                    alignment: 'left',
                    margin: [0, 0, 0, 0],
                  },
                ],
                columnGap: -70,
              },
              {
                columns: [
                  {
                    image: roles.regularPioneer ? checkedImage : uncheckedImage,
                    fit: [10, 10],
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: 'Precursor regular',
                    alignment: 'left',
                    margin: [0, 0, 0, 0],
                  },
                ],
                columnGap: -70,
              },
              {
                columns: [
                  {
                    image: roles.specialPioneer ? checkedImage : uncheckedImage,
                    fit: [10, 10],
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: 'Precursor especial',
                    alignment: 'left',
                    margin: [0, 0, 0, 0],
                  },
                ],
                columnGap: -70,
              },
              {
                columns: [
                  {
                    image: roles.missionary ? checkedImage : uncheckedImage,
                    fit: [10, 10],
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: 'Misionero que sirve en el campo',
                    alignment: 'left',
                    margin: [0, 0, 0, 0],
                  },
                ],
                columnGap: -70,
              },
            ],
          ],
        },
        layout: 'noBorders', // Remove borders from the table
      },
      {
        marginTop: 20,
        table: {
          widths: ['15%', '15%', '10%', '15%', '20%', '25%'],
          body: [
            // Encabezado de la tabla
            [
              {
                text: 'Año de servicio 2023-2024',
                bold: true,
                alignment: 'center',
                fontSize: 11,
                marginTop: 5,
              },
              {
                text: 'Participación en el ministerio',
                bold: true,
                alignment: 'center',
                fontSize: 11,
                marginTop: 5,
              },
              {
                text: 'Cursos bíblicos',
                bold: true,
                alignment: 'center',
                fontSize: 11,
                marginTop: 12,
              },
              {
                text: 'Precursor auxiliar',
                bold: true,
                alignment: 'center',
                fontSize: 11,
                marginTop: 15,
              },
              {
                text: 'Horas\n(Si es precursor o misionero que sirve en el campo)',
                bold: true,
                alignment: 'center',
                fontSize: 11,
                marginTop: 2,
              },
              {
                text: 'Notas',
                bold: true,
                alignment: 'center',
                fontSize: 11,
                marginTop: 20,
              },
            ],
            // Filas de la tabla con datos

            [
              { text: 'Septiembre', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predSep ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursSep,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxSep ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursSep,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsSep,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Octubre', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predOc ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursOc,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxOc ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursOc,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsOc,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Noviembre', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predNov ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursNov,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxNov ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursNov,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsNov,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Diciembre', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predDic ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursDic,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxDic ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursDic,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsDic,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Enero', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predEne ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursEne,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxEne ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursEne,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsEne,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Febrero', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predFeb ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursFeb,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxFeb ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursFeb,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsFeb,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Marzo', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predMar ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursMar,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxMar ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursMar,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsMar,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Abril', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predAbr ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursAbr,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxAbr ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursAbr,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsAbr,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Mayo', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predMay ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursMay,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxMay ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursMay,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsMay,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Junio', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predJun ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursJun,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxJun ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursJun,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsJun,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Julio', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predJul ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursJul,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxJul ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursJul,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsJul,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
            [
              { text: 'Agosto', fontSize: 11, margin: [0, 8, 0, 8] },
              {
                columns: [
                  {
                    image: card.predAgo ? checkedImage : uncheckedImage, // Imagen de check
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.cursAgo,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                columns: [
                  {
                    image: card.auxAgo ? checkedImage : uncheckedImage, // Imagen de cuadro sin marcar
                    fit: [12, 12], // Ajusta el tamaño de la imagen
                    margin: [0, 8, 0, 8],
                    alignment: 'center',
                  },
                ],
              },
              {
                text: card.hoursAgo,
                alignment: 'center',
                fontSize: 11,
                margin: [0, 8, 0, 8],
              },
              {
                text: card.commentsAgo,
                alignment: 'left',
                fontSize: 7,
                margin: [0, 8, 0, 8],
              },
            ],
          ],
        },
      },
    ],
  };

  return docDefinition;
};
