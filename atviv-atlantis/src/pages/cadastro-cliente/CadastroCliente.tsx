import { Box } from "@mui/material";
import { FormularioCliente } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export function CadastroCliente(){
    return(
        <LayoutBaseDePagina title="Novo Usuario">
            <Box>
                <FormularioCliente />
            </Box>
        </LayoutBaseDePagina>
    )
}