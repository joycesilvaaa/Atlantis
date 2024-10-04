import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import Acomodacao from "./acomodacao";
import Cliente from "./cliente";

export default class Hospedagem{
    private acomodacao : NomeAcomadacao
    private cliente: Cliente
    private dataInicial: Date
    private dataFinal: Date

    constructor(acomodacao: NomeAcomadacao, cliente: Cliente, dataInicial: Date, dateFinal: Date){
        this.acomodacao = acomodacao
        this.cliente = cliente
        this.dataInicial = dataInicial
        this.dataFinal = dateFinal
    }

    public get Acomodacao(){ return this.acomodacao}
    public get Cliente(){return this.cliente}
    public get DataInicial(){return this.dataInicial}
    public get DataFinal(){return this.dataFinal}

    public setAcomodacao(novoNomeAcomodacao: NomeAcomadacao){this.acomodacao = novoNomeAcomodacao}
    public setCliente(novoCliente: Cliente){ this.cliente = novoCliente}
    public setDataInicial(novaDataInicial: Date){ this.dataInicial = novaDataInicial}
    public setDataFinal(novaDataFinal: Date){this.dataFinal = novaDataFinal}
}