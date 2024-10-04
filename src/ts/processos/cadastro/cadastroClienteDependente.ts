import EncontraCliente from "../../utils/encontraCliente"
import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import Cliente from "../../modelos/cliente"
import Endereco from "../../modelos/endereco"
import Telefone from "../../modelos/telefone"
import CadastrarDocumentosCliente from "../tipos/cadastrarDocumentosCliente"


export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('---------------------------------------------------');
        console.log('   INICIANDO O CADASTRO DE UM NOVO DEPENDENTE');
        console.log('---------------------------------------------------');
        let documentoTitular = this.entrada.receberTexto('Digite o numero de documento do Titular: ')
        let armazem = Armazem.InstanciaUnica
        const titular = EncontraCliente(armazem.Clientes, documentoTitular)

        if (!titular) {
            console.log('Titular não encontrado!')
            return;
        }

        while (true){
            let nome = this.entrada.receberTexto('Qual o nome do novo dependente?')
            let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo denpente?')
            let dataNascimento = this.entrada.receberData('Qual a data de nascimento')
            let dependente = new Cliente(nome, nomeSocial, dataNascimento)

            dependente.setEndereco(titular.Endereco.clonar() as Endereco)
            dependente.setTelefones(titular.Telefones.map(tel => tel.clonar() as Telefone))
            dependente.setTitular(titular)

            this.processo = new CadastrarDocumentosCliente(dependente)
            this.processo.processar()

            titular.Dependentes.push(dependente)
            armazem.Clientes.push(dependente)

            let continuar = this.entrada.receberTexto('Deseja adicionar mais um dependente para o mesmo Titular? (S/N) ').toLowerCase()

            if(continuar === 'n'){
                break
            }
        }
        console.log('---------------------------------------------------');
        console.log('               FINALIZANDO CADASTRO');
        console.log('---------------------------------------------------');
    }
}