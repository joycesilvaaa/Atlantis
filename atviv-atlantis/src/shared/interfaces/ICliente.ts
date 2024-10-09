import { Dayjs } from "dayjs";
import { IDocumento } from "./IDocumento";
import { ITelefone } from "./ITelefone";

export interface ICliente {
    nome: string;
    email: string;
    dataNascimento: Dayjs;
    documentos: IDocumento[]; 
    telefones: ITelefone[];
    endereco: {
      rua: string;
      numero: string;
      cep: string;
      cidade: string;
      estado: string;
    };
    titular: boolean
  }

