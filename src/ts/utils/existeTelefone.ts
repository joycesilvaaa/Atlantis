import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";

export default function ExisteTelefone(clientes: Cliente[], ddd: string ,numero: string): [boolean, Telefone | null]{
    for (const cliente of clientes) {
        const telefoneEncontrado = cliente.Telefones.find(telefone => telefone.Ddd === ddd && telefone.Numero === numero);
        if (telefoneEncontrado) {
            return [true, telefoneEncontrado];
        }
    }
    return [false, null];
}
