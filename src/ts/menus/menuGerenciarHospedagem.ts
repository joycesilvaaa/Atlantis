import Menu from "../interfaces/menu";

export default class MenuGerenciarHospedagem implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`)
        console.log(`| Escolha a opção que deseja:`)
        console.log('-------------------------------------------------')
        console.log(`| 1 - Registrar Reserva`)
        console.log(`| 2 - Editar Reserva`)
        console.log(`| 3 - Ver Reserva`)
        console.log(`| 4 - Excluir Reserva`)
        console.log(`| 5 - Listagem `)
        console.log('-------------------------------------------------')
    }
}