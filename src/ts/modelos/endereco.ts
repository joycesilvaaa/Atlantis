import Prototipo from "../interfaces/prototipo"

export default class Endereco implements Prototipo {
    private rua: string
    private bairro: string
    private cidade: string
    private estado: string
    private pais: string
    private codigoPostal: string

    constructor(rua: string, bairro: string, cidade: string, estado: string, pais: string, codigoPostal: string) {
        this.rua = rua
        this.bairro = bairro
        this.cidade = cidade
        this.estado = estado
        this.pais = pais
        this.codigoPostal = codigoPostal
    }

    public get Rua() {return this.rua}
    public get Bairro() {return this.bairro}
    public get Cidade() {return this.cidade}
    public get Estado() {return this.estado}
    public get Pais() {return this.pais}
    public get CodigoPostal() {return this.codigoPostal}

    public setRua(novaRua: string){this.rua = novaRua}
    public setBairro(novoBairro: string){this.bairro = novoBairro}
    public setCidade(novaCidade: string){this.cidade = novaCidade}
    public setEstado(novoEstado: string){this.estado = novoEstado}
    public setPais(novoPais: string){this.pais = novoPais}
    public setCodigoPostal(novoCodigoPostal: string){this.codigoPostal = novoCodigoPostal}
    
    public clonar(): Prototipo {return new Endereco(this.rua, this.bairro, this.cidade, this.estado, this.pais, this.codigoPostal)}
}