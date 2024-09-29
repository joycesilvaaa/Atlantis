import Processo from "../../abstracoes/processo";
import ImpressorEndereco from "../../impressores/impressorEndereco";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";

export default class EditarEndereco extends Processo{
    private cliente: Cliente
    private impressor!: ImpressorEndereco
    constructor(cliente: Cliente){
        super()
        this.cliente = cliente
    }
    processar(): void {
        console.log('Iniciando Atualização de Endereço...')

        let enderecoAtual = this.cliente.Endereco

        console.log('-----------------------------')
        console.log('       Dados Atuais:')
        console.log('-----------------------------')
        this.impressor = new ImpressorEndereco(enderecoAtual)
        console.log(this.impressor.imprimir())
        console.log('-----------------------------')
        
        let novaRua = this.entrada.receberTexto('Digite o novo nome da rua (ou pressione Enter para manter):').trim()
        if(novaRua){
            enderecoAtual.setRua(novaRua)
        }
        let novoBairro = this.entrada.receberTexto('Digite o novo nome do bairro (ou pressione Enter para manter):').trim()
        if(novoBairro){
            enderecoAtual.setBairro(novoBairro)
        }
        let novaCidade = this.entrada.receberTexto('Digite o novo nome da cidade (ou pressione Enter para manter):').trim()
        if(novaCidade){
            enderecoAtual.setCidade(novaCidade)
        }
        let novoEstado = this.entrada.receberTexto('Digite o novo nome do estado (ou pressione Enter para manter):').trim()
        if(novoEstado){
            enderecoAtual.setEstado(novoEstado)
        }
        let novoPais = this.entrada.receberTexto('Digite o novo nome do país (ou pressione Enter para manter):').trim()
        if(novoPais){
            enderecoAtual.setPais(novoPais)
        }
        let novoCodigoPostal = this.entrada.receberTexto('Digite o novo código postal (ou pressione Enter para manter):').trim()
        if(novoCodigoPostal){
            enderecoAtual.setCodigoPostal(novoCodigoPostal)
        }

        if(this.cliente.Dependentes.length > 0){
            this.atualizaEnderecoDependente(this.cliente.Dependentes, this.cliente)
        }
        console.log('  Endereço Atualizado :)')
    }
    private atualizaEnderecoDependente(dependentes: Cliente[], titular: Cliente){
        console.log('-------------------------------------------')
        console.log('  Atualizando Endereço de Dependentes...')
        console.log('-------------------------------------------')
        for (const dependente of dependentes){
            dependente.setEndereco(titular.Endereco.clonar() as Endereco)
        }
    }
}