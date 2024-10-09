import { Box, Button, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ICliente } from "../../interfaces";

interface BuscaClienteProps{
    onClientChange: (cliente: ICliente | null) => void
}
export function BuscaCliente({ onClientChange }: BuscaClienteProps){
    const [documento, setDocumento] = useState('')
    const [cliente, setCliente] = useState<ICliente|null>(null)
    const [errorMessage, setErrorMessage] = useState('')

    function handleBusca(){
        if (documento === "123") {
            const clienteTeste: ICliente = {
                nome: 'Joyce',
                email: 'joyce@gmail.com',
                dataNascimento: dayjs('1990-05-15'), 
                documentos: [
                    { tipo: 'CPF', numero: '123.456.789-00', dataExpedicao: dayjs('2022-01-01') },
                    { tipo: 'RG', numero: '12.345.678-9', dataExpedicao: dayjs('2022-02-01') }
                ],
                telefones: [
                    {  ddd: '11', numero: '91234-5678' },
                    {  ddd: '11', numero: '98765-4321' }
                ],
                endereco: {
                    rua: 'Avenida Exemplo',
                    numero: '123',
                    cep: '01234-567',
                    cidade: 'São Paulo',
                    estado: 'SP'
                },
                titular: true
            }; 
            setCliente(clienteTeste)
            setErrorMessage("")
          } else { 
            setCliente(null);
            setErrorMessage("Cliente não encontrado");
          }
    }

    function handleClickInput(){
        setCliente(null);
        setErrorMessage('');
    }

    useEffect(()=>{
    onClientChange(cliente) 
    }, [cliente, setCliente])
    
  return (
    <Box margin={3} display={"flex"} flexDirection={"column"} gap={1} alignItems={"center"}>
      <TextField
        id="outlined-basic"
        label="Documento do titular"
        placeholder="Digite o numero do documento"
        multiline
        fullWidth
        onClick={handleClickInput}
        onChange={(e) => setDocumento(e.target.value)}
      />
     {!cliente && (
        <Button variant="outlined" color="secondary" onClick={handleBusca}>
          Buscar
        </Button>
      )}
      {errorMessage && ( 
        <Typography color="error">{errorMessage}</Typography>
      )}
    </Box>
  );
}
