import Cliente from "../modelos/cliente";

export default function PossuiTitular(cliente: Cliente): boolean{
   if(cliente.Titular){
    return true
   }
   return false
}