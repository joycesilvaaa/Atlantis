import { Box, SelectChangeEvent } from "@mui/material";
import {  Seletor } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState } from "react";


export function ListagemCliente() {
  const [tipoListagem, setTipoListagem] = useState<string | number>("");

  function handleTipoClienteValue(e: SelectChangeEvent<string | number>) {
    setTipoListagem(e.target.value)
  }

  const listagemOptions = [
    { value: 0, label: "Todos os titulares" },
    { value: 1, label: "Dependentes de um titular específico" },
    { value: 2, label: "Titular de um dependente específico" },
  ];

  return (
    <LayoutBaseDePagina title="Novo Usuario">
      <Box margin={3}>
        <Seletor
          title="Tipo de Cliente"
          value={tipoListagem}
          options={listagemOptions}
          handleChangeValue={handleTipoClienteValue}
        />
      </Box>
      <Box>
        
      </Box>
    </LayoutBaseDePagina>
  );
}