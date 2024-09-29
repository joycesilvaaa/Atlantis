import Menu from "../interfaces/menu";

export default class MenuTipoExclusao implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo de Exclusão deseja fazer? `)
        console.log(`----------------------`)
        console.log(`| 1 - Cliente Titular`)
        console.log(`| 2 - Cliente Dependente`)
        console.log(`| 3 - Documento`)
        console.log(`| 4 - Telefone`)
        console.log(`----------------------`)
    }
}