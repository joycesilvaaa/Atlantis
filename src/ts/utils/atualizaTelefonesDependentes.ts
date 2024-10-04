import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";

export default function AtualizaTelefoneDependentes(dependentes: Cliente[], titular: Cliente) {
    console.log('---------------------------------------------------');
    console.log('       ATUALIZANDO TELEFONES DE DEPENDENTES')
    console.log('---------------------------------------------------');
    for (const dependente of dependentes) {
        dependente.setTelefones(titular.Telefones.map(tel => tel.clonar() as Telefone))
    }
}