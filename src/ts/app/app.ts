import Principal from "../processos/principal";
import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import CadastroAcomodacoes from "../processos/cadastro/cadastroAcomodacoes";
import Hospedagem from "../modelos/hospedagem";
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";

console.clear();
console.log(`Bem-vindo(a) ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)`);

let processo: Processo;
let execucao: Boolean = true;

let armazem = Armazem.InstanciaUnica;

// Cria acomodação
let acomodacao = new CadastroAcomodacoes()
acomodacao.processar()

// Cliente 1 com Dependente
let cliente1 = new Cliente("Ana Silva", "Ana", new Date(1985, 4, 15));
let telefone1 = new Telefone("21", "999882233")
let telefone4 = new Telefone("12", "123");
cliente1.setTelefones([telefone1, telefone4]);

let documento1 = new Documento("789", TipoDocumento.Passaporte, new Date());
cliente1.Documentos.push(documento1);
let documento4 = new Documento("2684", TipoDocumento.Passaporte, new Date());

cliente1.Documentos.push(documento4);

let endereco1 = new Endereco("Rua A", "Bairro B", "Cidade C", "Estado D", "Brasil", "12345678");
cliente1.setEndereco(endereco1);

let dependente1 = new Cliente("Lucas Silva", "Lucas", new Date(2010, 6, 22))

documento1 = new Documento("321", TipoDocumento.Passaporte, new Date());
dependente1.Documentos.push(documento1);

dependente1.setTelefones(cliente1.Telefones.map(tel => tel.clonar() as Telefone));
dependente1.setEndereco(cliente1.Endereco.clonar() as Endereco);
cliente1.Dependentes.push(dependente1)
dependente1.setTitular(cliente1);

// Cliente 2 com Dependente
let cliente2 = new Cliente("Carlos Pereira", "Carlos", new Date(1990, 7, 10));
let telefone2 = new Telefone("11", "987654321");
cliente2.setTelefones([telefone2]);

let documento2 = new Documento("654", TipoDocumento.CPF, new Date());
cliente2.Documentos.push(documento2);

let endereco2 = new Endereco("Rua X", "Bairro Y", "Cidade Z", "Estado W", "Brasil", "87654321");
cliente2.setEndereco(endereco2);

let dependente2 = new Cliente("Maria Pereira", "Maria", new Date(2015, 2, 14));

documento2 = new Documento("987", TipoDocumento.RG, new Date());
dependente2.Documentos.push(documento2)

dependente2.setTelefones(cliente2.Telefones.map(tel => tel.clonar() as Telefone));
dependente2.setEndereco(cliente2.Endereco.clonar() as Endereco);
cliente2.Dependentes.push(dependente2)
dependente2.setTitular(cliente2);

// Adicionando clientes e dependentes ao armazém
armazem.Clientes.push(cliente1);
armazem.Clientes.push(dependente1);

armazem.Clientes.push(cliente2);
armazem.Clientes.push(dependente2);


// criando hospedagem teste
const hospedagem1 = new Hospedagem(NomeAcomadacao.CasalSimples, cliente1,new Date(2024, 11-1, 1), new Date(2024, 11-1, 6))
armazem.Hospedagem.push(hospedagem1)
const hospedagem2 = new Hospedagem(NomeAcomadacao.SolteiroMais, cliente2,new Date(2024, 10-1, 20), new Date(2024, 10-1, 26))
armazem.Hospedagem.push(hospedagem2)

while (execucao) {
    processo = new Principal();
    processo.processar();
    execucao = processo.Execucao;
}
