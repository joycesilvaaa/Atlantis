import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import ImpressorDocumentos from "../impressores/impressorDocumentos";
import Documento from "../modelos/documento";

export default function ListaDocumentosPorTipo(documentos: Documento[], tipo: TipoDocumento): boolean {
    let documentosTipoDesejado = documentos.filter(documento => documento.Tipo === tipo)
    if (documentosTipoDesejado.length === 0) {
        return false
    }
    let impressor = new ImpressorDocumentos(documentosTipoDesejado);
    impressor.imprimir()
    return true
}
