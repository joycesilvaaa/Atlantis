import Processo from "../../abstracoes/processo";
import ListagemTitularDoDependente from "../ver/listagemTitularDoDependente";
import MenuGerenciarHospedagem from "../../menus/menuGerenciarHospedagem";
import ListagemAcomodacoes from "../ver/listagemAcomodacoes";
import ListagemHospedagemPorPeriodo from "../ver/listagemHospedagemPorPeriodo";
import ListagemHospedagemPorCliente from "../ver/listagemHospedagemCliente";
import MenuTipoListagemHospedagem from "../../menus/menuTipoListagemHospedagem";

export default class TipoListagemHospedagem extends Processo {
    constructor(){
        super()
        this.menu = new MenuTipoListagemHospedagem()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                break;
            case 2:
                this.processo = new ListagemHospedagemPorPeriodo()
                this.processo.processar()
                break
            case 3:
                this.processo = new ListagemHospedagemPorCliente()
                this.processo.processar()
                break            
            default:
                console.log('Opção não entendida... :(')
        }
    }
}