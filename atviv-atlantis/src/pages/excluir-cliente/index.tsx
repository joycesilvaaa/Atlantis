import { Box,  Button } from "@mui/material";
import { ICliente } from "../../shared/interfaces";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";
import { useState } from "react";
import { VerDetalheCliente } from "../../shared/components/lista/VerDetalheCliente";


export function ExcluirCliente() {
  const [cliente, setCliente] = useState<ICliente | null>(null);
  function handleClienteChange(cliente: ICliente | null) {
    console.log(cliente);
    setCliente(cliente);
  }

  function handleDeleteClient() {
    setCliente(null);
  }
  return (
    <LayoutBaseDePagina title="Deletar Cliente">
      <BuscaCliente onClientChange={handleClienteChange} />
      <Box>
      {cliente && <VerDetalheCliente cliente={cliente} />}
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignContent={"center"}
        margin={4}
        gap={1}
      >
        {cliente && cliente.titular && (
          <Button variant="outlined" color="error" onClick={handleDeleteClient}>
            Deletar Cliente
          </Button>
        )}
      </Box>
    </LayoutBaseDePagina>
  );
}
