export interface ReportOptions {
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

  card: Card[];
}

interface Card {
  date: string;

  hours: number;

  comments: string;

  courses: string;

  preached: boolean;

  auxiliary: boolean;
}
