import ExisteTelefone from "../../utils/existeTelefone";
import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";

export default class CadastrarTelefonesCliente extends Processo{
    private cliente: Cliente
    constructor(cliente: Cliente){
        super()
        this.cliente = cliente
        this.execucao = true
    }
    processar(): void {
        let armazem = Armazem.InstanciaUnica
        console.log('------------------------------------')
        console.log('  Iniciando cadastro de Telefones')
        console.log('------------------------------------')
        while (true){
            let ddd = this.entrada.receberTexto('Qual o DDD do telefone?')
            let numero = this.entrada.receberTexto('Qual o numero de telefone?')
            let telefoneExistente = ExisteTelefone(armazem.Clientes, ddd, numero)[0]
            if(telefoneExistente){
                console.log('Telefone já regitrado no sistema.')
                continue
            }
            let telefone = new Telefone(ddd, numero)
            this.cliente.Telefones.push(telefone)
            let continuar = this.entrada.receberTexto('Deseja adicionar mais um telefone? (S/N)').toLowerCase()
            if(continuar === 'n'){
                break
            }
        }
        if(this.cliente.Dependentes.length > 0){
            this.atualizaTelefoneDependentes(this.cliente.Dependentes,this.cliente)
        }
        console.log('------------------------------------')
        console.log('Finalizando registro de telefones...')
        console.log('------------------------------------')
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