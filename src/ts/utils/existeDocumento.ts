import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default function ExisteDocumento(clientes: Cliente[], numero: string):[boolean, Documento | null] {
    for (const cliente of clientes) {
        const documentoEncontrado = cliente.Documentos.find(doc => doc.Numero === numero);
        if (documentoEncontrado) {
            return [true, documentoEncontrado];
        }
    }
    return [false, null];
}
