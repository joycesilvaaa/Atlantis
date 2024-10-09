import { useState } from "react";
import {  IHospedagem } from "../../shared/interfaces";
import { BuscaHospedagem } from "../../shared/components/busca/BuscaHospedagem";
import { FormularioHospedagem } from "../../shared/components";
import { Box } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";

export function EditarHospedagem() {
  const [hospedagem, setHospedagem] = useState<IHospedagem | null>(null);
  const [updateHospedagem, setUpdateHospedagem] = useState<IHospedagem | null>(
    null
  );
  const [esconde,setEsconde]=useState<boolean>(false)

  function handleHospedagemChange(hospedagem: IHospedagem | null) {
    if (hospedagem !== null){
        setHospedagem(hospedagem);
        setEsconde(true)
    }
    
  }
  function handleUpdateHospedagem(updateHospedagem: IHospedagem) {
    setUpdateHospedagem(updateHospedagem);
  }

  return (
    <LayoutBaseDePagina title="Editar Hospedagem">
      <Box>
      {!esconde && (
          <BuscaHospedagem onHospedagemChange={handleHospedagemChange} />
        )}
        {hospedagem && (
          <FormularioHospedagem
            onSaveHospedagem={handleUpdateHospedagem}
            hospedagemEditavel={hospedagem}
          />
        )}
      </Box>
    </LayoutBaseDePagina>
  );
}
