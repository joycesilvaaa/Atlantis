import Impressor from "../interfaces/impressor";
import Endereco from "../modelos/endereco";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem
    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem
    }
    imprimir(): string {
        let impressao =`` 
            + `| Reserva de Hospedagem:\n`
            + `| Cliente: ${this.hospedagem.Cliente.NomeSocial}\n`
            + `| Tipo Acomodação: ${this.hospedagem.Acomodacao}\n`
            + `| Data Inicial: ${this.hospedagem.DataInicial.toLocaleDateString()}\n`
            + `| Data Final: ${this.hospedagem.DataFinal.toLocaleDateString()}`
        return impressao
    }
}