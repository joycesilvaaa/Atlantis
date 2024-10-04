import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import EncontraCliente from "../../utils/encontraCliente";

export default class VerClienteEspecifico extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('---------------------------------------------------')
        console.log('               CLIENTE ESPECÍFICO')
        console.log('---------------------------------------------------')
        let numero = this.entrada.receberTexto('Digite o numero de documento do cliente:')
        let cliente = EncontraCliente(this.clientes, numero)
        if(!cliente){
            console.log('Cliente não encontrado!')
            return 
        }
        this.impressor = new ImpressaorCliente(cliente)
        console.log(this.impressor.imprimir())
    }
}