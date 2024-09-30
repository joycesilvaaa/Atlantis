import Processo from "../../abstracoes/processo";
import MenuTipoListagemClientes from "../../menus/menuTipoListagemClientes";
import ListagemDependenteDeUmTitular from "../ver/listagemDependentesDeUmTitular";
import ListagemTitulares from "../ver/listagemTitulares";
import ListagemTitularDoDependente from "../ver/listagemTitularDoDependente";

export default class TipoListagemClientes extends Processo {
    constructor(){
        super()
        this.menu = new MenuTipoListagemClientes()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break;
            case 2:
                this.processo = new ListagemDependenteDeUmTitular()
                this.processo.processar()
                break
            case 3:
                this.processo = new ListagemTitularDoDependente()
                this.processo.processar()
                break            
            default:
                console.log('Opção não entendida... :(')
        }
    }
}