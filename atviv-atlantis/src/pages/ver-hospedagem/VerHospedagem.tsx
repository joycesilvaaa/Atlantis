import {  Box, } from "@mui/material";
import {  IHospedagem } from "../../shared/interfaces";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState } from "react";
import { BuscaHospedagem } from "../../shared/components/busca/BuscaHospedagem";
import { VerDetalheHospedagem } from "../../shared/components/lista/VerDetalheHospedagem";


export function VerHospedagem() {
    const [hospedagem, setHospedagem] = useState<IHospedagem | null>(null);
    function handleHospedagemChange(hospedagem: IHospedagem | null) {
        setHospedagem(hospedagem)
    }
  return (
    <LayoutBaseDePagina title="Ver Cliente">
      <BuscaHospedagem onHospedagemChange={handleHospedagemChange} />
      <Box display={"flex"} justifyContent={"center"}>
        {hospedagem && <VerDetalheHospedagem hospedagem={hospedagem}/>}
      </Box>
    </LayoutBaseDePagina>
  );
}