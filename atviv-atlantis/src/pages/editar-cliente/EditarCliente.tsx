import { Box } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState } from "react";
import { ICliente, IDependente } from "../../shared/interfaces";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";

import { FormularioCliente } from "../../shared/components";
import { FormularioDependente } from "../../shared/components/formularios/FormularioDependente";

export function EditarCliente() {
  const [cliente, setCliente] = useState<ICliente | null>(null);
  const [clienteUpdate, setClienteUpdate] = useState<
    ICliente | null | IDependente
  >(null);
  function handleClienteChange(cliente: ICliente | null) {
    console.log(cliente);
    setCliente(cliente);
  }
  function handleClienteUpdateChange(cliente: ICliente | null | IDependente) {
    console.log(cliente);
    setClienteUpdate(cliente);
  }

  return (
    <LayoutBaseDePagina title="Editar Cliente">
      <Box>
        <BuscaCliente onClientChange={handleClienteChange} />
        {cliente &&
          (cliente.titular ? (
            <FormularioCliente
              clienteEditavel={cliente}
              onSaveCliente={handleClienteUpdateChange}
            />
          ) : (
            <FormularioDependente
              clienteEditavel={cliente}
              onSaveDependente={handleClienteUpdateChange}
            />
          ))}
      </Box>
    </LayoutBaseDePagina>
  );
}
