import { Box } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState } from "react";
import { ICliente } from "../../shared/interfaces";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";

import { FormularioCliente } from "../../shared/components";

export function EditarCliente(){
    const [cliente, setCliente] = useState<ICliente | null>(null);
    const [clienteUpdate, setClienteUpdate] = useState<ICliente | null>(null);
    function handleClienteChange(cliente: ICliente | null) {
        console.log(cliente)
        setCliente(cliente);
    }
    function handleClienteUpdateChange(cliente: ICliente | null) {
        console.log(cliente)
        setClienteUpdate(cliente);
    }
    
    return(
        <LayoutBaseDePagina title="Editar Cliente">
            <Box>
                <BuscaCliente onClientChange={handleClienteChange} />
                {cliente && <FormularioCliente clienteEditavel={cliente} onSaveCliente={handleClienteUpdateChange}/>}
            </Box>
        </LayoutBaseDePagina>
    )
}