import Cliente from "../modelos/cliente";

export default function VerificaTitularidadeCliente(cliente: Cliente): boolean{
   if(!cliente.Titular){
    return true
   }
   return false
}