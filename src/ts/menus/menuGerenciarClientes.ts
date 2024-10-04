import Menu from "../interfaces/menu";

export default class MenuGerenciarClientes implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`)
        console.log(`| Escolha a opção que deseja:`)
        console.log(`-------------------------------------------------`)
        console.log(`| 1 - Cadastrar Cliente`)
        console.log(`| 2 - Editar cliente`)
        console.log(`| 3 - Ver Cliente`)
        console.log(`| 4 - Opções de Exclusão`)
        console.log(`| 5 - Listagem `)
        console.log(`-------------------------------------------------`)
    }
}