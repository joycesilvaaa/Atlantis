import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";
import Armazem from "../../dominio/armazem";
import ExisteDocumento from "../../utils/existeDocumento";
import ListaDocumentosPorTipo from "../../utils/listaDocumentosPorTipo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";

export default class EditarCpf extends Processo{
    private cliente : Cliente
    private armazem: Armazem
    constructor(cliente: Cliente){
        super()
        this.cliente = cliente
        this.armazem = Armazem.InstanciaUnica
    }
    processar(): void {
        console.log('Inciando Atualização de Cpf...')
        let documentosAtuais = this.cliente.Documentos
        if (documentosAtuais.length === 0) {
            console.log('Necessário realizar o cadastro de um novo documento antes de editá-lo.');
            return;
        }

        const documentosLista = ListaDocumentosPorTipo(documentosAtuais, TipoDocumento.CPF);
        if (!documentosLista) {
            console.log('Nenhum documento CPF cadastrado.');
            return;
        }
        console.log(documentosLista)

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

            let dataExpedicao = this.entrada.receberData('Digite a nova data de expedição do documento (ou pressione Enter para manter):')
            if(dataExpedicao){
                documentoAtual.setDataExpedicao(dataExpedicao)
            }

            let continuar = this.entrada.receberTexto('Deseja atualizar mais algum Cpf? (S/N)').toLowerCase().trim()
            if(continuar === 'n'){
                break
            }
        }
    }
}