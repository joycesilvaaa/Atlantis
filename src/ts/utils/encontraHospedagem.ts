import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";

export default function EncontraHospedagem(hospedagens: Hospedagem[], cliente:Cliente, dataInicial: Date, dataFinal: Date): Hospedagem | null{
    for (let hospedagem of hospedagens){
        if(hospedagem.Cliente === cliente &&  hospedagem.DataInicial.toLocaleDateString() === dataInicial.toLocaleDateString() && hospedagem.DataFinal.toLocaleDateString() === dataFinal.toLocaleDateString()){
            return hospedagem
        }
    } 
    return null
}