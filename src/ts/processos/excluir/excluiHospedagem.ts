import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import EncontraCliente from "../../utils/encontraCliente"
import EncontraHospedagem from "../../utils/encontraHospedagem"


export default class ExcluirHospedagem extends Processo {
    private armazem: Armazem

    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log('---------------------------------------------------');
        console.log('          INICIANDO EXCLUSÃO DE HOSPEDAGEM');
        console.log('---------------------------------------------------');
        let numeroDoc = this.entrada.receberTexto('Digite o numero do documento do cliente:').trim();
        let cliente = EncontraCliente(this.armazem.Clientes, numeroDoc);
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }
        
        let dataInicial = this.entrada.receberData('Digite a data inicial da hospedagem:')
        let dataFinal = this.entrada.receberData('Digite a data final da hospedagem:')

        let hospedagem= EncontraHospedagem(this.armazem.Hospedagem,cliente,dataInicial, dataFinal)
        if (!hospedagem){
            console.log('Hospedagem não encontrada.')
            return
        }
       
        const indice = this.armazem.Hospedagem.findIndex(hosp => 
            hosp.Cliente === hospedagem.Cliente &&
            hosp.Acomodacao === hospedagem.Acomodacao &&
            hosp.DataInicial === hospedagem.DataInicial &&
            hosp.DataFinal === hospedagem.DataFinal
        );
        
        if (indice === -1) {
            console.log('Erro ao desassociar hospedagem do cliente: Hospedagem não encontrada na lista.');
            return;
        }

        const indiceAcomodacao = this.armazem.Acomodacoes.findIndex(acomodacao => 
            acomodacao.NomeAcomadacao === hospedagem.Acomodacao
        );
        
        if (indiceAcomodacao === -1) {
            console.log('Erro ao localizar a acomodação.');
            return;
        }

        const quantidadeAtual = this.armazem.Acomodacoes[indiceAcomodacao].QuantidadeDisponivel
        this.armazem.Acomodacoes[indiceAcomodacao].setQuantidadeDisponivel(Number(quantidadeAtual) + 1);

        this.armazem.Hospedagem.splice(indice, 1)
        
        console.log('---------------------------------------------------');
        console.log('               HOSPEDAGEM EXCLUÍDA')
        console.log('---------------------------------------------------');
    }
}