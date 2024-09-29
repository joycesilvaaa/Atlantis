import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import EncontraCliente from "../../utils/encontraCliente";
import PossuiTitular from "../../utils/possuiTitular";

export default class ListagemTitularDoDependente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('---------------------------------------------------')
        console.log('  Listagem do Titular de um dependente especifico')
        console.log('---------------------------------------------------')
        let numero = this.entrada.receberTexto('Digite o numero de documento do dependente:')
        let dependente = EncontraCliente(this.clientes, numero)
        if(!dependente){
            console.log('Dependente não encontrado!')
            return 
        }
        let clienteTitular = PossuiTitular(dependente)
        if(!clienteTitular){
            console.log('O Dependente que foi buscado não possui Titular.')
            return
        }
        let titular = dependente.Titular as Cliente
        console.log('---------------------------------------------------')
        console.log(`     Titular do dependente ${dependente.Nome.toLocaleUpperCase()}:`)
        console.log('---------------------------------------------------')
        this.impressor = new ImpressaorCliente(titular)
        console.log(this.impressor.imprimir())
    }
}