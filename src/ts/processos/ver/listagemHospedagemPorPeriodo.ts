import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorAcomodacao from "../../impressores/impressorAcomodacao";
import ImpressorHospedagem from "../../impressores/impressorHospedagem";
import Impressor from "../../interfaces/impressor";
import Acomodacao from "../../modelos/acomodacao";
import ListaHospedagem from "../../utils/listaHospedagem";

export default class ListagemHospedagemPorPeriodo extends Processo {
    private armazem: Armazem
    private impressor!: Impressor
    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }
    processar(): void {
        console.clear()
        console.log(`-------------------------------------------------`)
        console.log('           HOSPEDAGENS POR PERÍODO')
        console.log(`-------------------------------------------------`)
        let dataInicial = this.entrada.receberData('Digite a data inicial do periodo');
        let dataFinal = this.entrada.receberData('Digite a data final do periodo');
        console.log(`-------------------------------------------------`)
        let hospedagens = this.armazem.Hospedagem.filter(hosp=>
            hosp.DataInicial >= dataInicial && hosp.DataFinal <= dataFinal
        )
        if(hospedagens.length === 0){
            console.log('Nenhuma hospedagem encontrada para o período informado.');
            return
        }
        ListaHospedagem(hospedagens)
        console.log(`-------------------------------------------------`)
        console.log('               FIM DA LISTAGEM')
        console.log(`-------------------------------------------------`)
    }
}