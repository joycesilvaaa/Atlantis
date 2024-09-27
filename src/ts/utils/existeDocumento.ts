import Cliente from "../modelos/cliente";

export default function ExisteDocumento(clientes: Cliente[], numero: string): boolean {
    for (let cliente of clientes) {
        for (let documento of cliente.Documentos) {
            if (documento.Numero === numero) {
                return true
            }
        }
    }
    return false
}
