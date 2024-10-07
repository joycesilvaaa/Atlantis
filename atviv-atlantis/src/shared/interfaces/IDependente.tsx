import { Dayjs } from "dayjs";
import { IDocumento } from "./IDocumento";

export interface IDependente {
    nome: string;
    email: string;
    dataNascimento: Dayjs;
    documentos: IDocumento[]; 
    titular: boolean
  }
