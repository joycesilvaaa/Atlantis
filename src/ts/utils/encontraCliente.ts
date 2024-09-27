import Cliente from "../modelos/cliente";

export default function EncontraCliente(clientes: Cliente[], numero: string): Cliente | null {
    for (let cliente of clientes) {
        for (let documento of cliente.Documentos) {
            if (documento.Numero === numero) {
                return cliente
            }
        }
    }
    return null
}
