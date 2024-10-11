import {  Box, Button, } from "@mui/material";
import {  IHospedagem } from "../../shared/interfaces";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState } from "react";
import { BuscaHospedagem } from "../../shared/components/busca/BuscaHospedagem";
import { VerDetalheHospedagem } from "../../shared/components/lista/VerDetalheHospedagem";


export function ExcluirHospegadem() {
    const [hospedagem, setHospedagem] = useState<IHospedagem | null>(null);
    function handleHospedagemChange(hospedagem: IHospedagem | null) {
        setHospedagem(hospedagem)
    }
    
    function handleDeleteHospedagem(){
        setHospedagem(null)
    }

  return (
    <LayoutBaseDePagina title="Excluir Hospedagem">
      <BuscaHospedagem onHospedagemChange={handleHospedagemChange} />
      <Box display="flex" 
                justifyContent="center" 
                alignItems="center" 
                flexDirection="column" 
                margin={2}>
        {hospedagem && <VerDetalheHospedagem hospedagem={hospedagem}/>}
        {hospedagem &&  (
          <Button variant="outlined" color="error" onClick={handleDeleteHospedagem} sx={{ maxWidth: '200px'}}>
            Deletar Hospedagem
          </Button>
        )}
      </Box>
    </LayoutBaseDePagina>
  );
}