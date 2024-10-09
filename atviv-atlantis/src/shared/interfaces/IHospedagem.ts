import dayjs, { Dayjs } from "dayjs";
import { ICliente } from "./ICliente";

export interface IHospedagem{
    cliente?: ICliente
    tipoAcomodacao: string,
    dataInicial: Dayjs,
    dataFinal: Dayjs
}