import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import Armazem from "../../dominio/armazem";
import ExisteDocumento from "../../utils/existeDocumento";
import ImpressorDocumentos from "../../impressores/impressorDocumentos";
import Impressor from "../../interfaces/impressor";

export default class EditarDocumento extends Processo{
    private cliente : Cliente
    private armazem: Armazem
    private impressor!: Impressor
    constructor(cliente: Cliente){
        super()
        this.cliente = cliente
        this.armazem = Armazem.InstanciaUnica
    }
    processar(): void {
        console.log('---------------------------------------------------');
        console.log('          INICIANDO EDIÇÃO DE DOCUMENTOS');
        console.log('---------------------------------------------------');
        let documentosAtuais = this.cliente.Documentos
        if (documentosAtuais.length === 0) {
            console.log('Necessário realizar o cadastro de um novo documento antes de editá-lo.');
            return;
        }

        this.impressor = new ImpressorDocumentos(documentosAtuais)
        console.log(this.impressor.imprimir())

        while (true){
            let numero = this.entrada.receberTexto('Qual o número do documento que deseja atualizar?')
            let documentoAtual = ExisteDocumento(this.armazem.Clientes, numero)[1]
            if(!documentoAtual){
                console.log('Documento não encontrado')
                return
            }
            
            let novoNumero = this.entrada.receberTexto('Digite o número novo do documento (ou pressione Enter para manter):').trim()
            if(novoNumero){
                let documentoExistente = ExisteDocumento(this.armazem.Clientes, novoNumero)[0]
                if(documentoExistente){
                    console.log('Já existe documento cadastrado com esse numero.')
                    return
                }
                documentoAtual.setNumero(novoNumero)
            }

            let dataExpedicao = this.entrada.receberData('Digite a nova data de expedição do documento (ou pressione Enter para manter)')
            if(dataExpedicao && !isNaN(dataExpedicao.getTime())){
                documentoAtual.setDataExpedicao(dataExpedicao)
            }
            console.log('---------------------------------------------------');
            console.log('               DOCUMENTO ATUALIZADO');
            console.log('---------------------------------------------------');

            let continuar = this.entrada.receberTexto('Deseja atualizar mais algum documento? (S/N)').toLowerCase().trim()
            if(continuar === 'n'){
                break
            }
        }
    }
}