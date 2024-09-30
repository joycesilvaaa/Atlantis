import EncontraCliente from "../../utils/encontraCliente";
import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressorCliente from "../../impressores/impressorCliente";
import EditarEndereco from "./editarEndereco";
import PossuiTitular from "../../utils/possuiTitular";
import EditarTelefonesCliente from "./editarTelefonesCliente";
import CadastrarDocumentosCliente from "../tipos/cadastrarDocumentosCliente";
import Cliente from "../../modelos/cliente";
import EditarDocumento from "./editarDocumento";
import CadastrarTelefonesCliente from "../cadastro/cadastroTelefonesCliente";

export default class EditarCliente extends Processo{
    private armazem: Armazem
    private impressor!: ImpressorCliente
    constructor(){
        super()
        this.armazem = Armazem.InstanciaUnica
    }
    processar(): void {
        let numeroDocumento = this.entrada.receberTexto('Digite o numero do documento do cliente:')
        let cliente = EncontraCliente(this.armazem.Clientes, numeroDocumento)
        if(!cliente){
            console.log('Cliente não encontrado. Tente novamente!')
            return
        }

        let clienteTitular = PossuiTitular(cliente)

        this.impressor = new ImpressorCliente(cliente)
        console.log(this.impressor.imprimir())
        
        let novoNome = this.entrada.receberTexto('Digite que o nome que deseja usar (ou pressione Enter para manter):').trim()
        if (novoNome){
            cliente.setNome(novoNome)
        }
        let novoNomeSocial = this.entrada.receberTexto('Digite nome social que deseja usar (ou pressione Enter para manter):').trim()
        if (novoNomeSocial){
            cliente.setNomeSocial(novoNomeSocial)
        }
        let novaDataNascimento = this.entrada.receberData('Digite a data de nascimento (ou pressione Enter para manter):')
        if (novaDataNascimento && !isNaN(novaDataNascimento.getTime())){
            cliente.setDataNascimento(novaDataNascimento)
        }

        console.log('| Escolha uma opção abaixo:')
        console.log('| 1 - Adicionar Documento')
        console.log('| 2 - Adicionar Telefone (Opção apenas para titular)')
        console.log('| 3 - Editar Endereço (Opção apenas para titular)')
        console.log('| 4 - Editar Telefone (Opção apenas para titular)')
        console.log('| 5 - Editar Documeto')
        console.log('| 6 - Finalizar Atualização')
        
        let opcao = this.entrada.receberNumero('Digite a opção que deseja:')

        switch(opcao){
            case 1:
                this.adicionarDocumetos(cliente);
                break;
            case 2:
                this.adicionarTelefone(cliente, clienteTitular);
                break;
            case 3:
                this.editarEndereco(cliente, clienteTitular);
                break;
            case 4:
                this.editarTelefone(cliente, clienteTitular);
                break;
            case 5:
                this.editarDocumetos(cliente);
                break;
            case 6:
                console.log('Atualização finalizada com sucesso!');
                break;
            default:
                console.log('Opção inválida! Tente novamente.');
                break;
        }
    }
    private adicionarDocumetos(cliente: Cliente){
        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()
    }
    private adicionarTelefone(cliente: Cliente, clienteTitular: boolean){
        if(!clienteTitular){
            this.processo = new CadastrarTelefonesCliente(cliente)
            this.processo.processar()         
        }else{
            console.log('Esta opção é apenas para titulares.');
        }
    }
    private editarEndereco(cliente: Cliente, clienteTitular: boolean){
        if(!clienteTitular){
            this.processo = new EditarEndereco(cliente)
            this.processo.processar()        
        }else{
            console.log('Esta opção é apenas para titulares.');
        }
    }
    private editarTelefone(cliente: Cliente, clienteTitular: boolean){
        if(!clienteTitular){
            this.processo = new EditarTelefonesCliente(cliente)
            this.processo.processar()      
        }else{
            console.log('Esta opção é apenas para titulares.');
        }
    }
    private editarDocumetos(cliente: Cliente){
        this.processo = new EditarDocumento(cliente)
        this.processo.processar()
    }
}