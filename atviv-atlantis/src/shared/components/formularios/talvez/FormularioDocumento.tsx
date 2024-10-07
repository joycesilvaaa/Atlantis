import { useEffect, useState } from "react";
import { Seletor } from "../../seletor/Seletor";
import {
  Box,
  Button,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { Documento } from "../../../interfaces";



interface FormularioDocumentoProps {
  documentosIniciais?: Documento[]; 
  onChangeDocumentos: (documentos: Documento[]) => void;
}

export function FormularioDocumento({
  documentosIniciais = [],
  onChangeDocumentos,
}: FormularioDocumentoProps) {
  const [documentos, setDocumentos] = useState<Documento[]>([
    ...documentosIniciais,
  ]);

  const tiposDocumentos = [
    { value: "CPF", label: "Cadastro de Pessoas Física" },
    { value: "RG", label: "Registro Geral" },
    { value: "Passaporte", label: "Passaporte" },
  ];

  function handleDocumentoChange(
    index: number,
    field: keyof Documento,
    value: any
  ) {
    const newDocumentos = documentos.map((documento, idx) =>
      idx === index ? { ...documento, [field]: value } : documento
    );
    setDocumentos(newDocumentos);
  }

  function addDocumento() {
    setDocumentos([
      ...documentos,
      { id: documentos.length, tipo: "CPF", numero: "", dataExpedicao: null },
    ]);
  }

  function removeDocumento(index: number) {
    const newDocumentos = documentos.filter((_, idx) => idx !== index);
    setDocumentos(newDocumentos);
  }

  useEffect(() => {
    onChangeDocumentos([...documentos]);
  }, [documentos]);

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">Documentos</Typography>
      {documentos.map((documento, index) => (
        <Box key={index} display="flex" flexDirection="column" gap={1}>
          <Seletor
            title="Tipo de Documento"
            options={tiposDocumentos}
            value={documento.tipo}
            handleChangeValue={(event) =>
             handleDocumentoChange(index, "tipo", event.target.value)
            }
          />
          <TextField
            label="Número do Documento"
            placeholder="Digite o número do documento"
            value={documento.numero}
            onChange={(e) =>
                handleDocumentoChange(index, "numero", e.target.value)
              }
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                label="Data de Expedição"
                value={documento.dataExpedicao}
                onChange={(newValue) =>
                    handleDocumentoChange(index, "dataExpedicao", newValue)
                  }
                format="DD/MM/YYYY"
                fullWidth
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeDocumento(index)}
          >
            Remover Documento
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={addDocumento}>
        Adicionar Documento
      </Button>
    </Box>
  );
}
