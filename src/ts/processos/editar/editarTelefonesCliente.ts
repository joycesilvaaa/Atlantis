import ExisteTelefone from "../../utils/existeTelefone";
import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";
import ImpressorTelefones from "../../impressores/impressorTelefones";
import ImpressorTelefone from "../../impressores/impressorTelefone";

export default class EditarTelefonesCliente extends Processo {
    private cliente: Cliente
    private armazem: Armazem
    private impressor!: ImpressorTelefones | ImpressorTelefone
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
        this.armazem = Armazem.InstanciaUnica
    }
    processar(): void {
        console.log('-----------------------------------')
        console.log(' Iniciando Edição de Telefones...')
        console.log('-----------------------------------')

        let telefonesAtuais = this.cliente.Telefones
        if (telefonesAtuais.length === 0) {
            console.log('Sem telefones cadastrados para edição.')
            return
        }

        this.impressor = new ImpressorTelefones(telefonesAtuais)
        console.log(this.impressor.imprimir())


        let ddd = this.entrada.receberTexto('Qual o DDD do telefone que deseja editar?').trim()
        let numero = this.entrada.receberTexto('Qual o numero de telefone que deseja editar?').trim()
        let telefoneAtual = ExisteTelefone(this.armazem.Clientes, ddd, numero)[1]
        if (!telefoneAtual) {
            console.log('Telefone não encontrado!')
            return
        }
        let indiceTelefone = telefonesAtuais.indexOf(telefoneAtual)
        if (indiceTelefone === -1) {
            console.log('Erro ao editar telefone do titular: Telefone não encontrado na lista.')
            return
        }

        let novoDdd = this.entrada.receberTexto('Digite o novo DDD do telefone:').trim()
        let novoNumero = this.entrada.receberTexto('Digite o novo numero de telefone:').trim()
        let telefoneExistente = ExisteTelefone(this.armazem.Clientes, novoDdd, novoNumero)[0]
        if (telefoneExistente) {
            console.log('Telefone já regitrado no sistema.')
            return
        }
        telefonesAtuais[indiceTelefone].setDdd(novoDdd)
        telefonesAtuais[indiceTelefone].setNumero(novoNumero)
        
        if(this.cliente.Dependentes.length > 0){
            this.atualizaTelefoneDependentes(this.cliente.Dependentes,this.cliente)
        }
        
        console.log('  Telefone Atualizado :) ')
    }
    private atualizaTelefoneDependentes(dependentes: Cliente[], titular: Cliente) {
        console.log('-------------------------------------------')
        console.log('  Atualizando Telefones de Dependentes...')
        console.log('-------------------------------------------')
        for (const dependente of dependentes) {
            dependente.setTelefones(titular.Telefones.map(tel => tel.clonar() as Telefone))
        }
    }
}