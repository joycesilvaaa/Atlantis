import Processo from "../abstracoes/processo"
import MenuPrincipal from "../menus/menuPricipal"
import GerenciarHospedagem from "./tipos/gerenciarHospedagem"
import GerenciarClientes from "./tipos/gerenciarClientes"

export default class Principal extends Processo {
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new GerenciarClientes()
                this.processo.processar()
                break
            case 2:
                this.processo = new GerenciarHospedagem()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}