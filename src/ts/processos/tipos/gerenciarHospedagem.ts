import Processo from "../../abstracoes/processo";
import MenuGerenciarHospedagem from "../../menus/menuGerenciarHospedagem";
import CadastrarHospedagem from "../cadastro/cadastrarHospedagem";
import EditarHospedagem from "../editar/editarHospedagem";
import ExcluirHospedagem from "../excluir/excluiHospedagem";
import VerHospedagemEspecifica from "../ver/verReservaEspecifica";
import TipoListagemHospedagem from "./tipoListagemHospedagem";

export default class GerenciarHospedagem extends Processo{
    constructor(){
        super()
        this.menu = new MenuGerenciarHospedagem()
    }
    processar(): void {
        this.menu.mostrar()
        let opcao = this.entrada.receberNumero('Qual opção deseja?')
        switch(opcao){
            case 1:
                this.processo = new CadastrarHospedagem()
                this.processo.processar()
                break
            case 2:
                this.processo = new EditarHospedagem()
                this.processo.processar()
                break
            case 3:
                this.processo = new VerHospedagemEspecifica()
                this.processo.processar()
                break
            case 4:
                this.processo = new ExcluirHospedagem()
                this.processo.processar()
                break
            case 5:
                this.processo = new TipoListagemHospedagem()
                this.processo.processar()
                break
            default:
                console.log('Opção invalida.')
                return
        }
    }
}