import Prototipo from "../interfaces/prototipo"

export default class Telefone implements Prototipo {
    private ddd: string
    private numero: string
    constructor(ddd: string, numero: string) {
        this.ddd = ddd
        this.numero = numero
    }
    public get Ddd() { return this.ddd }
    public get Numero() { return this.numero }

    public setDdd(novoDdd: string){this.ddd = novoDdd}
    public setNumero(novoNumero:string){this.numero = novoNumero}
    
    clonar(): Prototipo {return new Telefone(this.Ddd, this.Numero)}
}