import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import EncontraCliente from "../../utils/encontraCliente";

export default class ListagemDependenteDeUmTitular extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('---------------------------------------------------')
        console.log('Listagem de Dependentes para um titular especifico')
        console.log('---------------------------------------------------')
        let numero = this.entrada.receberTexto('Digite o numero de documento do Titular:')
        let clienteTitular = EncontraCliente(this.clientes, numero)
        if (!clienteTitular) {
            console.log('Cliente não encontrado!')
            return
        }
        if (clienteTitular.Dependentes.length === 0) {
            console.log('Cliente não possui dependentes cadastrados!')
            return
        }
        console.log('---------------------------------------------------')
        console.log(`       Dependentes do Cliente ${clienteTitular.Nome.toLocaleUpperCase()}:`)
        console.log('---------------------------------------------------')
        clienteTitular.Dependentes.forEach(dependente => {

            this.impressor = new ImpressaorCliente(dependente)
            console.log(this.impressor.imprimir())
        })
    }
}