import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";

export default function AtualizaEnderecoDependente(dependentes: Cliente[], titular: Cliente){
    console.log('---------------------------------------------------');
    console.log('       ATUALIZANDO ENDEREÇO DE DEPENDENTES');
    console.log('---------------------------------------------------');
    for (const dependente of dependentes){
        dependente.setEndereco(titular.Endereco.clonar() as Endereco)
    }
}