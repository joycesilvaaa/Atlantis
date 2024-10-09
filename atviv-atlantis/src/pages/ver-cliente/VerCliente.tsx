import { Box} from "@mui/material";
import { ICliente } from "../../shared/interfaces";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";
import { useState } from "react";
import { VerDetalheCliente } from "../../shared/components/lista/VerDetalheCliente";


export function VerCliente() {
    const [cliente, setCliente] = useState<ICliente | null>(null);
    function handleClienteChange(cliente: ICliente | null) {
        console.log(cliente)
        setCliente(cliente);
    }
  return (
    <LayoutBaseDePagina title="Ver Cliente">
      <BuscaCliente onClientChange={handleClienteChange} />
      <Box display={"flex"} justifyContent={"center"}>
        {cliente && <VerDetalheCliente cliente={cliente}/>}
      </Box>
    </LayoutBaseDePagina>
  );
}
