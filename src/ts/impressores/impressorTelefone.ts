import Impressor from "../interfaces/impressor";
import Telefone from "../modelos/telefone";

export default class ImpressorTelefone implements Impressor{
    private telefone: Telefone
    constructor(telefone: Telefone){
        this.telefone = telefone
    }
    imprimir(): string {
        let impressao =`****************************\n` 
                    + `| Telefone: (${this.telefone.Ddd}) ${this.telefone.Numero}`
        return impressao
    }
}