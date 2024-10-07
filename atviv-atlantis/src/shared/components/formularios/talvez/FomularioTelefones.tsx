// src/components/FormularioTelefones/FormularioTelefones.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Telefone } from "../../../interfaces";

interface FormularioTelefonesProps {
  onChangeTelefones: (telefones: Telefone[]) => void;
  telefonesIniciais?: Telefone[]; // Propriedade opcional para telefones iniciais
}

export function FormularioTelefones({
  onChangeTelefones,
  telefonesIniciais = [{ id: 0, ddd: "", numero: "" }],
}: FormularioTelefonesProps) {
  const [telefones, setTelefones] = useState<Telefone[]>(telefonesIniciais);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Atualiza os telefones quando os telefonesIniciais mudam
    setTelefones(telefonesIniciais);
  }, [telefonesIniciais]);

  function handleChange(index: number, field: keyof Telefone, value: string) {
    const newTelefones = telefones.map((telefone, idx) =>
      idx === index ? { ...telefone, [field]: value } : telefone
    );
    setTelefones(newTelefones);
  }

  function addTelefone() {
    setTelefones([...telefones, { id: telefones.length, ddd: "", numero: "" }]);
  }

  function removeTelefone(index: number) {
    const updatedTelefones = telefones.filter(
      (telefone) => telefone.id !== index
    );
    setTelefones(updatedTelefones);
  }

  useEffect(() => {
    onChangeTelefones(telefones);
  }, [telefones, onChangeTelefones]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5">Telefones</Typography>
      {telefones.map((telefone, index) => (
        <Box
          key={telefone.id}
          display="flex"
          flexDirection={smDown ? "column" : "row"}
          gap={1}
        >
          <TextField
            id={`ddd-${index}`}
            label="DDD"
            placeholder="Digite o ddd do telefone"
            fullWidth
            value={telefone.ddd}
            onChange={(e) => handleChange(index, "ddd", e.target.value)}
          />
          <TextField
            id={`numero-${index}`}
            label="Número"
            placeholder="Digite o número do telefone"
            fullWidth
            value={telefone.numero}
            onChange={(e) => handleChange(index, "numero", e.target.value)}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => removeTelefone(index)}
            sx={{ minWidth: "100px" }}
          >
            Remover
          </Button>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={addTelefone}>
        Adicionar Telefone
      </Button>
    </Box>
  );
}
