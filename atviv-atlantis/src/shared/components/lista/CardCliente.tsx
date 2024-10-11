import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { ICliente, IDocumento } from "../../interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardClienteProps {
  cliente: ICliente;
}

export function CardCliente({ cliente }: CardClienteProps) {
  const navigate = useNavigate()

    function handleVerDetalhe(documento: any){
      navigate(`/ver-cliente/${documento.numero}`)
    }

  return (
    <Box display="flex" justifyContent="center" padding={1}>
      <Card
        sx={{
          width: 300,  
          height: 200, 
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",  
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {cliente.nome}
          </Typography>
          <Typography variant="body2">E-mail: {cliente.email}</Typography>
          <Typography variant="body2" component="div">
            Data de Nascimento: {cliente.dataNascimento.format("DD/MM/YYYY")}
          </Typography>
          {cliente.documentos.map((documento, index) => (
            <Typography key={index} variant="body2" component="div">
              {documento.tipo}: {documento.numero}
            </Typography>
          ))}
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => handleVerDetalhe(cliente.documentos[0])} 
          >
            Ver detalhes
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
