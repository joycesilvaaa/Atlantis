import Processo from "../../abstracoes/processo";
import MenuTipoExclusao from "../../menus/menuTipoExclusao";
import ExcluirClienteTitular from "../excluir/excluirClienteTitular";
import ExcluirClienteDependente from "../excluir/excluirClienteDependente";
import ExcluirDocumento from "../excluir/excluirDocumento";
import ExcluirTelefone from "../excluir/excluirTelefone";

export default class TipoExclusao extends Processo {
    constructor(){
        super()
        this.menu = new MenuTipoExclusao()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ExcluirClienteTitular()
                this.processo.processar()
                break;
            case 2:
                this.processo = new ExcluirClienteDependente()
                this.processo.processar()
                break
            case 3: 
                this.processo = new ExcluirDocumento()
                this.processo.processar()
                break
            case 4: 
                this.processo = new ExcluirTelefone()
                this.processo.processar()
                break
            default:
                console.log('Opção não entendida... :(')
        }
    }
}