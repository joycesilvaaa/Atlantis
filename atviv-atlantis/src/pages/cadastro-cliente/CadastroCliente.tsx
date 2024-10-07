import { Box, SelectChangeEvent } from "@mui/material";
import { FormularioCliente, Seletor } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState } from "react";
import { FormularioDependente } from "../../shared/components/formularios/FormularioDependente";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";
import { ICliente, IDependente } from "../../shared/interfaces";
export function CadastroCliente() {
  const [tipoCliente, setTipoCliente] = useState<string | number>("");
  const [cliente, setCliente] = useState<ICliente | null>(null);
  const [novoCliente,setNovoCliente] = useState<ICliente|null| IDependente>(null)

  function handleTipoClienteValue(e: SelectChangeEvent<string | number>) {
    setTipoCliente(e.target.value)
    setCliente(null);
  }

  function handleClienteChange(cliente: ICliente | null) {
    console.log(cliente)
    setCliente(cliente);
  }

  function handleNovoClienteChange(novoCliente: ICliente | IDependente){
    console.log(novoCliente)
    setNovoCliente(novoCliente)
  }

  const clienteOptions = [
    { value: 0, label: "Titular" },
    { value: 1, label: "Dependente" },
  ];

  return (
    <LayoutBaseDePagina title="Novo Usuario">
      <Box margin={3}>
        <Seletor
          title="Tipo de Cliente"
          value={tipoCliente}
          options={clienteOptions}
          handleChangeValue={handleTipoClienteValue}
        />
      </Box>
      <Box>
        {tipoCliente === 0 && <FormularioCliente onSaveCliente={handleNovoClienteChange}/>}
        {tipoCliente === 1 && (
          <>
            <BuscaCliente onClientChange={handleClienteChange} />
            {cliente && cliente.titular && <FormularioDependente onSaveDependente={handleNovoClienteChange}/>}
          </>
        )}
      </Box>
    </LayoutBaseDePagina>
  );
}
