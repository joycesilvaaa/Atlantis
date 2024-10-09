import dayjs, { Dayjs } from "dayjs";

export interface IHospedagem{
    tipoAcomodacao: string,
    dataInicial: Dayjs,
    dataFinal: Dayjs
}