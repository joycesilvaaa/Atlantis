import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorHospedagem from "../../impressores/impressorHospedagem";
import Impressor from "../../interfaces/impressor";
import EncontraCliente from "../../utils/encontraCliente";
import EncontraHospedagem from "../../utils/encontraHospedagem";
import PossuiTitular from "../../utils/possuiTitular";

export default class VerHospedagemEspecifica extends Processo {
    private armazem : Armazem
    private impressor!: Impressor
    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }
    processar(): void {
        console.clear()
        console.log('---------------------------------------------------')
        console.log('                    HOSPEDAGEM')
        console.log('---------------------------------------------------')
        let numeroDoc = this.entrada.receberTexto('Digite o numero do documento do cliente:').trim();
        

        let cliente = EncontraCliente(this.armazem.Clientes, numeroDoc);
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }

        let clienteTitular = PossuiTitular(cliente)
        if(clienteTitular){
            console.log('A pesquisa deve ser feita em com os documentos de titulares!')
            return
        }
        
        let dataInicial = this.entrada.receberData('Digite a data inicial da hospedagem')
        let dataFinal = this.entrada.receberData('Digite a data final da hospedagem')
        console.log('---------------------------------------------------')
        let hospedagem= EncontraHospedagem(this.armazem.Hospedagem,cliente,dataInicial, dataFinal)
        if (!hospedagem){
            console.log('Hospedagem não encontrada.')
            return
        }
        this.impressor = new ImpressorHospedagem(hospedagem)
        console.log(this.impressor.imprimir())
        console.log('---------------------------------------------------')
    }
}