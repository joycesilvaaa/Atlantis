import ImpressorHospedagem from "../impressores/impressorHospedagem";
import Hospedagem from "../modelos/hospedagem";

export default function ListaHospedagem(hospedagens : Hospedagem[]){
    hospedagens.forEach(hospedagem => {
        let impressor = new ImpressorHospedagem(hospedagem)
        console.log(impressor.imprimir())
        console.log(`-------------------------------------------------`)
    })
}