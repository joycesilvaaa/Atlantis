import { Typography, Box, List, ListItem } from "@mui/material";
import { ICliente, IHospedagem } from "../../shared/interfaces";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";
import { useState } from "react";
import { VerDetalheCliente } from "../../shared/components/lista/VerDetalheCliente";
import { BuscaHospedagem } from "../../shared/components/busca/BuscaHospedagem";
import { VerDetalheHospedagem } from "../../shared/components/lista/VerDetalheHospedagem";

interface ClienteProps {
  cliente: ICliente;
}

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