import { FormularioCliente } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export function CadastroCliente(){
    return(
        <LayoutBaseDePagina title="Novo Usuario">
            <FormularioCliente></FormularioCliente>
        </LayoutBaseDePagina>
    )
}