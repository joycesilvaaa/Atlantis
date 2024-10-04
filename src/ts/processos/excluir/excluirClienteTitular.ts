import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import EncontraCliente from "../../utils/encontraCliente";
import PossuiTitular from "../../utils/possuiTitular";

export default class  ExcluirClienteTitular extends Processo{
    private armazem : Armazem
    constructor(){
        super()
        this.armazem = Armazem.InstanciaUnica
    }
    processar(): void {
        console.log('---------------------------------------------------');
        console.log('           INICIANDO EXCLUSÃO DE TITULAR');
        console.log('---------------------------------------------------');

        let numeroDocumento = this.entrada.receberTexto('Digite o numero do documento do cliente:')
        let cliente = EncontraCliente(this.armazem.Clientes, numeroDocumento)
        if(!cliente){
            console.log('Cliente não encontrado. Tente novamente!')
            return
        }

        let clienteTitular = PossuiTitular(cliente)
        if(clienteTitular){
            console.log(`Não é possível excluir o cliente, pois ele tem um titular. Caso queira excluir ${cliente.Nome}, escolha a opção "Excluir Dependente".`)
            return;
        }

        let continuar = this.entrada.receberTexto(`Tem certeza que deseja excluir o cliente ${cliente.Nome}? (S/N)`).toLowerCase().trim()
        if(continuar === 'n'){
            console.log('Cliente não excluido')
            return
        }

        if(cliente.Dependentes.length > 0){
            this.excluirTodosDependentes(cliente.Dependentes)
        }

        const indice = this.armazem.Clientes.indexOf(cliente)
        if (indice === -1){
            console.log('Erro ao excluir o cliente: Cliente não encontrado na lista.')
            return
        }
        this.armazem.Clientes.splice(indice, 1)
        console.log('---------------------------------------------------');
        console.log('               CLIENTE EXCLUÍDO');
        console.log('---------------------------------------------------');
    }
    private excluirTodosDependentes(dependentes: Cliente[]){
        for (const dependente of dependentes){
            const indice = this.armazem.Clientes.indexOf(dependente)
            if (indice !== -1){
               this.armazem.Clientes.splice(indice, 1)
            }
        }
    }
}