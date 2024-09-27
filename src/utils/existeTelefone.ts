import Cliente from "../ts/modelos/cliente";

export default function ExisteTelefone(clientes: Cliente[], ddd: string ,numero: string): boolean {
    for (let cliente of clientes) {
        for (let telefone of cliente.Telefones) {
            if (telefone.Ddd === ddd && telefone.Numero === numero) {
                return true
            }
        }
    }
    return false
}
