import Processo from "../../../../atviii-atlantis/src/ts/abstracoes/processo";
import DiretorSolteiroSimples from "../../diretores/diretorSolteiroSimples";
import Armazem from "../../../../atviii-atlantis/src/ts/dominio/armazem";
import Acomodacao from "../modelos/acomodacao";

export default class CadastroAcomodacoes extends Processo {
    private acomodacoes: Acomodacao[]
    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {
        let diretor = new DiretorSolteiroSimples()
        this.acomodacoes.push(diretor.construir())
    }
}