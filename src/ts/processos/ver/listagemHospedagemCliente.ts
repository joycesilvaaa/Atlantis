import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorAcomodacao from "../../impressores/impressorAcomodacao";
import ImpressorHospedagem from "../../impressores/impressorHospedagem";
import Impressor from "../../interfaces/impressor";
import Acomodacao from "../../modelos/acomodacao";
import EncontraCliente from "../../utils/encontraCliente";
import ListaHospedagem from "../../utils/listaHospedagem";

export default class ListagemHospedagemPorCliente extends Processo {
    private armazem: Armazem
    private impressor!: Impressor
    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }
    processar(): void {
        console.clear()
        console.log(`-------------------------------------------------`)
        console.log('            HOSPEDAGENS POR CLIENTE')
        console.log(`-------------------------------------------------`)
        let numeroDoc = this.entrada.receberTexto('Digite o numero do documento do cliente:').trim();
        console.log(`-------------------------------------------------`)
        let cliente = EncontraCliente(this.armazem.Clientes, numeroDoc);
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }
        let hospedagens = this.armazem.Hospedagem.filter(hosp=>
            hosp.Cliente === cliente
        )
        if(hospedagens.length === 0){
            console.log(`Nenhuma hospedagem registrada para o cliente.`);
            return
        }
        ListaHospedagem(hospedagens)
        console.log(`-------------------------------------------------`)
        console.log('               FIM DA LISTAGEM')
        console.log(`-------------------------------------------------`)
    }
}