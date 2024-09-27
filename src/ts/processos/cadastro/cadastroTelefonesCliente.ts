import ExisteTelefone from "../../../utils/existeTelefone";
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
        console.log('Iniciando cadastro de Telefones')
        while (true){
            let ddd = this.entrada.receberTexto('Qual o DDD do telefone?')
            let numero = this.entrada.receberTexto('Qual o numero de telefone?')
            let telefoneExistente = ExisteTelefone(armazem.Clientes, ddd, numero) 
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
        console.log('Finalizando registro de telefones...')
    }
}