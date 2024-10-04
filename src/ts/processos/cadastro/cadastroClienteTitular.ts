import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import CadastrarDocumentosCliente from "../tipos/cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";
import CadastrarTelefonesCliente from "./cadastroTelefonesCliente";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('---------------------------------------------------');
        console.log('      INICIANDO O CADASTRO DE UM NOVO CLIENTE');
        console.log('---------------------------------------------------');
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        this.processo = new CadastroEnderecoTitular(cliente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        this.processo = new CadastrarTelefonesCliente(cliente)
        this.processo.processar()

        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.push(cliente)

        console.log('---------------------------------------------------');
        console.log('               FINALIZANDO CADASTRO');
        console.log('---------------------------------------------------');
    }
}