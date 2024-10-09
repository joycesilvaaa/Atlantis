import { useState } from "react";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";
import { ICliente, IHospedagem } from "../../shared/interfaces";
import { Box } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FormularioHospedagem } from "../../shared/components";

export function CadastroHospedagem() {
  const [cliente, setCliente] = useState<ICliente | null>(null);
  const [hospedagem, setHospedagem] = useState<IHospedagem|null>(null)

  function handleClienteChange(cliente: ICliente | null) {
    console.log(cliente);
    setCliente(cliente);
  }

  function handleHospedagemChange(hospedagem: IHospedagem){
    setHospedagem(hospedagem)
  }


  return (
    <LayoutBaseDePagina title="Nova Hospedagem">
      <Box>
        <BuscaCliente onClientChange={handleClienteChange} />
        {cliente && cliente.titular && (
          <FormularioHospedagem onSaveHospedagem={handleHospedagemChange} />
        )}
      </Box>
    </LayoutBaseDePagina>
  );
}
