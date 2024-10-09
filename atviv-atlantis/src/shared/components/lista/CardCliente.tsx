import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { ICliente, IDocumento } from "../../interfaces";
import { ModalCopiar } from "../modal/ModalCopiar";
import { useState } from "react";

interface CardClienteProps {
  cliente: ICliente;
}

export function CardCliente({ cliente }: CardClienteProps) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDocumento, setSelectedDocumento] = useState<IDocumento|null>(null); 

  function handleOpenModal(documento: IDocumento){
    setSelectedDocumento(documento); 
    setOpenModal(true); 
  };

  function handleCloseModal(){
    setOpenModal(false);
  };

  return (
    <Box display="flex" justifyContent="center" padding={1}>
      <Card sx={{ maxWidth: 345 }}>
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
            onClick={() => handleOpenModal(cliente.documentos[0])} 
          >
            Ver detalhes
          </Button>
        </CardActions>
      </Card>
      <ModalCopiar
        documento={selectedDocumento as IDocumento}
        open={openModal}
        handleClose={handleCloseModal}
      />
    </Box>
  );
}
