import { TipoDocumento } from "../enumeracoes/tipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import Entrada from "./entrada";

const entrada = new Entrada();
console.log("Bem-vindo ao Atlantis");
console.log("1 - Cadastrar Novo Cliente");
console.log("2 - Sair");

let opcao = entrada.receberNumero("Digite a opção escolhida: ");
while (opcao !== 3) {
    if (opcao === 1) {
        cadastrarNovoUsuario();
    }else if (opcao === 2){
        break
    }
    console.log("1 - Cadastrar Novo Cliente");
    console.log("2 - Sair");
    opcao = entrada.receberNumero("Digite a opção escolhida: ");
}

function cadastrarNovoUsuario() {
    console.log("----------------Dados do cliente------------------");
    const cliente = new Cliente();
    cliente.nome =entrada.receberTexto("Digite o nome do cliente: ");
    cliente.nomeSocial = entrada.receberTexto("Digite o nome social: ");
    cliente.dataCadastro = entrada.receberData("Digite a data de nascimento: ");
    cliente.dataNascimento = entrada.receberData("Digite a data de cadastro: ");

    const perguntaDoc = entrada.receberNumero("Digite a quantidade de documentos que deseja cadastrar: ")
    let cont = 0
    while ( cont < perguntaDoc){
        cadastrarDocumento(cliente)
        cont =  cont + 1
    }

    console.log("---------------------Endereço---------------------");
    cadastrarEndereco(cliente)
    
    console.log("---------------------Contato-------------------------");
    let opcaoTel = entrada.receberNumero("Digite a quantidade de telefones que deseja cadastrar: ");
    while (opcaoTel === null) {
        opcaoTel = entrada.receberNumero("Digite a quantidade de telefones que deseja cadastrar: ");
    }
    
    let c = 0;
    while( c< opcaoTel){
        cadastrarTelefone(cliente)
        c = c + 1;
    }

    console.log("--------------------Dependentes------------------------");
    let cadastrarDependenteOpcao = entrada.receberNumero("Deseja cadastrar dependente? ");
    console.log("1 - Sim");
    console.log("2 - Não");
    
    if (cadastrarDependenteOpcao === 1) {
        let quantDependente = entrada.receberNumero("Digite a quantidade de dependentes que deseja cadastrar: ");
        while (quantDependente === null) {
            quantDependente = entrada.receberNumero("Digite a quantidade de dependentes que deseja cadastrar: ");
        }
        
        let cont = 0;
        while (cont < quantDependente) {
            cadastrarDependente(cliente);
            cont = cont + 1;
        }
    }
    console.log('=-=-=-=-=-=--=-=-=-=-==-=-=Cliente=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
    console.log(cliente);
    
}

function cadastrarDependente(cliente) {
    const dependente = new Cliente();
    dependente.nome = entrada.receberTexto("Digite o nome do dependente: ");
    dependente.nomeSocial = entrada.receberTexto("Digite o nome social do dependente: ");
    dependente.dataCadastro = entrada.receberData("Digite a data de cadastro do dependente: ");
    dependente.dataNascimento = entrada.receberData("Digite a data de nascimento do dependente: ");
    dependente.endereco = cliente.endereco.clonar();
    const perguntaDoc = entrada.receberNumero("Digite a quantidade de documentos que deseja cadastrar: ")
    let cont = 0
    while ( cont < perguntaDoc){
        cadastrarDocumento(dependente)
        cont =  cont + 1
    }
    dependente.titular = cliente;
    dependente.telefones = cliente.telefones.map(telefone => telefone.clonar());
    cliente.dependentes.push(dependente);
    console.log('=-=-=-=-=-=--=-=-=-=-=-=-=Dependente-=-=-=-=-=-=-=-=-=-=-=-')
    console.log(dependente);
}

function cadastrarDocumento(cliente){
    const documento = new Documento()
    console.log("Escolha a opção de documento que vai ser usada")
    console.log(" 1 - Cadastro de Pessoas Física")
    console.log(" 2 - Registro Geral")
    console.log(" 3 - Passaporte")
    let docOpcao = entrada.receberNumero("Digite a opção que deseja cadastrar: ")
    while (docOpcao< 0 || docOpcao >3){
        docOpcao = entrada.receberNumero("Digite a opção que deseja cadastrar: ")
    }
    if (docOpcao === 1){
        documento.tipo = TipoDocumento.CPF
    }else if (docOpcao === 2){
        documento.tipo = TipoDocumento.RG
    }else{
        documento.tipo = TipoDocumento.Passaporte
    }
    documento.numero = entrada.receberTexto("Digite o numero do documento: ")
    documento.dataExpedicao = entrada.receberData("Digite a data de expedição: ")
    cliente.documentos.push(documento)
}

function cadastrarEndereco(cliente){
    const endereco = new Endereco();
    endereco.rua = entrada.receberTexto("Digite a rua: ");
    endereco.bairro = entrada.receberTexto("Digite o bairro: ");
    endereco.cidade = entrada.receberTexto("Digite a cidade: ");
    endereco.estado = entrada.receberTexto("Digite o estado: ");
    endereco.pais = entrada.receberTexto("Digite o país: ");
    endereco.codigoPostal = entrada.receberTexto("Digite o código postal: ");
    cliente.endereco = endereco;

}

function cadastrarTelefone(cliente){
    const telefone = new Telefone();
    telefone.ddd = entrada.receberTexto("Digite o DDD: ");
    telefone.numero = entrada.receberTexto("Digite o número do telefone: ");
    cliente.telefones.push(telefone);
}