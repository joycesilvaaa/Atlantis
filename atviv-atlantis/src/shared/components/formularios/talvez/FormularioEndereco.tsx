import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { IEndereco } from '../../../interfaces';

interface FormularioEnderecoProps {
  onChangeEndereco: (endereco: IEndereco) => void; 
  enderecoInicial?: { 
    cep: string;
    cidade: string;
    rua: string;
    estado: string;
    numero: string;
  };
}

export function FormularioEndereco({ onChangeEndereco, enderecoInicial }: FormularioEnderecoProps) {
  const [endereco, setEndereco] = useState({
    cep: '',
    cidade: '',
    rua: '',
    estado: '',
    numero: ''
  });

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (enderecoInicial) {
      setEndereco(enderecoInicial);
    }
  }, [enderecoInicial]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEndereco((prevEndereco) => ({
      ...prevEndereco,
      [name]: value
    }));
  }

  useEffect(() => {
    onChangeEndereco(endereco);
  }, [endereco, onChangeEndereco]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5">Endereço</Typography>
      <Box display="flex" flexDirection={smDown ? 'column' : 'row'} gap={1}>
        <TextField
          id="cep"
          name="cep"
          label="CEP"
          placeholder="Digite o cep do seu endereço"
          multiline
          fullWidth
          value={endereco.cep} 
          onChange={handleChange} 
        />
        <TextField
          id="cidade"
          name="cidade"
          label="Cidade"
          placeholder="Digite a cidade do seu endereço"
          multiline
          fullWidth
          value={endereco.cidade}
          onChange={handleChange}
        />
      </Box>
      <Box display="flex" flexDirection={smDown ? 'column' : 'row'} gap={1}>
        <TextField
          id="rua"
          name="rua"
          label="Rua"
          placeholder="Digite a rua do seu endereço"
          multiline
          fullWidth
          value={endereco.rua}
          onChange={handleChange}
        />
        <TextField
          id="estado"
          name="estado"
          label="Estado"
          placeholder="Digite o estado do seu endereço"
          multiline
          fullWidth
          value={endereco.estado}
          onChange={handleChange}
        />
        <TextField
          id="numero"
          name="numero"
          label="Número"
          placeholder="Digite o número do seu endereço"
          multiline
          fullWidth
          value={endereco.numero}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
