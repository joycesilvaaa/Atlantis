import ExisteDocumento from "../../utils/existeDocumento";
import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";

export default class CadastroPassaporte extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let numero = this.entrada.receberTexto('Qual o número do documento?')
        let documentoExistente = ExisteDocumento(armazem.Clientes, numero)
        if(documentoExistente){
            console.log('Documento já registrado')
            return
        }
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        let passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao)
        this.cliente.Documentos.push(passaporte)
    }
}