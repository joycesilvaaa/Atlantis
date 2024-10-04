import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import Cliente from "../../modelos/cliente"
import EncontraCliente from "../../utils/encontraCliente"
import PossuiTitular from "../../utils/possuiTitular"

export default class ExcluirClienteDependente extends Processo {
    private armazem: Armazem

    constructor() {
        super()
        this.armazem = Armazem.InstanciaUnica
    }

    processar(): void {
        console.log('---------------------------------------------------');
        console.log('          INICIANDO EXCLUSÃO DE DEPENDENTE');
        console.log('---------------------------------------------------');

        let numeroDocumento = this.entrada.receberTexto('Digite o número do documento do dependente:')
        let dependente = EncontraCliente(this.armazem.Clientes, numeroDocumento)
        
        if (!dependente) {
            console.log('Dependente não encontrado. Tente novamente!')
            return
        }

        let clienteTitular = PossuiTitular(dependente)
        if (!clienteTitular) {
            console.log(`Não é possível excluir o dependente, pois ele não tem um titular. Caso queira excluir ${dependente.Nome}, escolha a opção "Excluir Cliente".`)
            return
        }

        let continuar = this.entrada.receberTexto(`Tem certeza que deseja excluir o dependente ${dependente.Nome}? (S/N)`).toLowerCase().trim()
        if (continuar === 'n') {
            console.log('Dependente não excluído.')
            return
        }

        let titular = dependente.Titular as Cliente
        let indiceDependente = titular.Dependentes.findIndex(d => d === dependente)
        
        if (indiceDependente === -1) {
            console.log('Erro ao desassociar dependente do titular: Dependente não encontrado na lista.')
            return
        }

        const indice = this.armazem.Clientes.indexOf(dependente)
        
        if (indice === -1) {
            console.log('Erro ao excluir o dependente: Dependente não encontrado na lista.')
            return
        }

        titular.Dependentes.splice(indiceDependente, 1)
        
        this.armazem.Clientes.splice(indice, 1)
        
        console.log('---------------------------------------------------');
        console.log('               DEPENDENTE EXCLUÍDO');
        console.log('---------------------------------------------------');
    }
}
