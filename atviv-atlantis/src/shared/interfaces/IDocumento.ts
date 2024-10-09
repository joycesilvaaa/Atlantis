import { Dayjs } from "dayjs";

export interface IDocumento {
    tipo: string;
    numero: string;
    dataExpedicao: Dayjs;
  }

export  interface Documento {
    id: number;
    tipo: string;
    numero: string;
    dataExpedicao: Dayjs | null;
  }