import Processo from "../../abstracoes/processo";
import MenuTipoDocumento from "../../menus/menuTipoDocumento";
import Cliente from "../../modelos/cliente";
import EditarCpf from ".././editar/editarCpf";
import EditarPassaporte from ".././editar/editarPassaporte";
import EditarRg from ".././editar/editarRg";

export default class EdicaoDocumentosCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuTipoDocumento()
        this.execucao = true
    }

    processar(): void {
        console.log('Iniciando o Atualização de Documentos...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1: 
                    this.processo = new EditarCpf(this.cliente)
                    this.processo.processar()
                    break
                case 2:
                    this.processo = new EditarRg(this.cliente)
                    this.processo.processar()
                    break
                case 3: 
                    this.processo = new EditarPassaporte(this.cliente)
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}