import Processo from "../../abstracoes/processo";
import MenuGerenciarClientes from "../../menus/menuGerenciarClientes";
import EditarCliente from "../editar/editarCliente";
import VerClienteEspecifico from "../ver/verClienteEspecifico";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoExclusao from "./tipoExclusao";
import TipoListagemClientes from "./tipoListagemClientes";

export default class GerenciarClientes extends Processo{
    constructor(){
        super()
        this.menu = new MenuGerenciarClientes()
    }
    processar(): void {
        this.menu.mostrar()
        let opcao = this.entrada.receberNumero('Qual opção deseja?')
        switch(opcao){
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 2:
                this.processo = new EditarCliente()
                this.processo.processar()
                break
            case 3: 
                this.processo = new VerClienteEspecifico()
                this.processo.processar()
                break
            case 4:
                this.processo = new TipoExclusao()
                this.processo.processar()
                break
            case 5:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            default:
                console.log('Opção invalida.')
                return
        }
    }
}