import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import ImpressorDocumentos from "../../impressores/impressorDocumentos"
import EncontraCliente from "../../utils/encontraCliente"
import ExisteDocumento from "../../utils/existeDocumento"


export default class ExcluirDocumento extends Processo {
    private armazem: Armazem
    private impressor!: ImpressorDocumentos

    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log('----------------------------------------')
        console.log('   Iniciando Exclusão de Documento:')
        console.log('----------------------------------------')

        const numeroDocumento = this.entrada.receberTexto('Digite o número do documento do cliente:').trim()
        const cliente = EncontraCliente(this.armazem.Clientes, numeroDocumento)
        
        if (!cliente) {
            console.log('Cliente não encontrado. Tente novamente!')
            return
        }

        const documentos = cliente.Documentos

        if (documentos.length === 0) {
            console.log('O cliente não possui nenhum documento cadastrado.')
            return
        }

        if (documentos.length === 1) {
            console.log('Existe apenas um documento cadastrado. Você deve cadastrar um novo documento para prosseguir com a exclusão.')
            return
        }

        const numero = this.entrada.receberTexto('Qual o número do documento que deseja excluir?').trim()
        const documentoExiste = ExisteDocumento(this.armazem.Clientes, numero)[1]

        if (!documentoExiste) {
            console.log('Documento não encontrado.')
            return
        }

        const indice = cliente.Documentos.findIndex(doc => doc.Numero === documentoExiste.Numero && doc.Tipo === documentoExiste.Tipo && doc.DataExpedicao === documentoExiste.DataExpedicao)
        
        if (indice === -1) {
            console.log('Erro ao desassociar documento do cliente: Documento não encontrado na lista.')
            return
        }
        
        cliente.Documentos.splice(indice, 1)
        
        console.log('----------------------------------------')
        console.log('           Documento Excluído')
        console.log('----------------------------------------')
    }
}
