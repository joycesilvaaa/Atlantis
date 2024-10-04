import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { NomeAcomadacao } from "../../enumeracoes/NomeAcomadacao";
import ImpressorAcomodacao from "../../impressores/impressorAcomodacao";
import Impressor from "../../interfaces/impressor";
import Hospedagem from "../../modelos/hospedagem";
import EncontraCliente from "../../utils/encontraCliente";
import EncontraHospedagem from "../../utils/encontraHospedagem";
import PossuiTitular from "../../utils/possuiTitular";

export default class CadastrarHospedagem extends Processo {
    private armazem: Armazem;
    private impressor!: Impressor;

    constructor() {
        super();
        this.armazem = Armazem.InstanciaUnica;
    }

    processar(): void {
       console.log('---------------------------------------------------');
        console.log('         INICIANDO RESERVA DE HOSPEDAGEM');
       console.log('---------------------------------------------------');
        let numeroDoc = this.entrada.receberTexto('Digite o numero do documento do cliente:').trim();
       console.log('---------------------------------------------------');
        let cliente = EncontraCliente(this.armazem.Clientes, numeroDoc);
        if (!cliente) {
            console.log('Cliente não encontrado.');
            return;
        }
        let clienteTitular = PossuiTitular(cliente);
        if (clienteTitular) {
            console.log('A reserva de uma hospedagem só pode ser feita por um Cliente Titular.');
            return;
        }
        this.armazem.Acomodacoes.forEach((acomodacao, index) => {
            this.impressor = new ImpressorAcomodacao(acomodacao);
            console.log(`${index + 1}. ${this.impressor.imprimir()}`);
           console.log('---------------------------------------------------');
        });
        

        let nomeHospedagem: NomeAcomadacao;
        let acomodacao = this.entrada.receberNumero('Digite qual acomodação você deseja (numero):');
        switch (acomodacao) {
            case 1:
                nomeHospedagem = NomeAcomadacao.CasalSimples;
                break;
            case 2:
                nomeHospedagem = NomeAcomadacao.FamilaSimples;
                break;
            case 3:
                nomeHospedagem = NomeAcomadacao.FamiliaMais;
                break;
            case 4:
                nomeHospedagem = NomeAcomadacao.FamiliaSuper;
                break;
            case 5:
                nomeHospedagem = NomeAcomadacao.SolteiroSimples;
                break;
            case 6:
                nomeHospedagem = NomeAcomadacao.SolteiroMais;
                break;
            default:
                console.log('Opção inválida.');
                return;
        }

        let dataInicial = this.entrada.receberData('Digite a data inicial da reserva');
        let dataFinal = this.entrada.receberData('Digite a data final da hospedagem')
        let hospedagem = new Hospedagem(nomeHospedagem, cliente, dataInicial, dataFinal)

        let hospedagemExistente= EncontraHospedagem(this.armazem.Hospedagem,hospedagem.Cliente,hospedagem.DataInicial, hospedagem.DataFinal)

        if (hospedagemExistente) {
            console.log('O cliente já possui reserva para os mesmos dias. Caso queira modificá-la, vá para edição de reserva!');
            return;
        }

        this.armazem.Hospedagem.push(hospedagem)
       console.log('---------------------------------------------------');
        console.log('               HOSPEDAGEM RESERVADA')
       console.log('---------------------------------------------------');
    }
}
