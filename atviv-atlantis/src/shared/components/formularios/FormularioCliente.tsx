import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Seletor } from "../seletor/Seletor";
import { Dayjs } from "dayjs";

interface ITelefone {
  id: number;
  ddd: string;
  numero: string;
}
interface IDocumento {
  id: number;
  tipo: string;
  numero: string;
  dataExpedicao: Dayjs | null;
}

export function FormularioCliente() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [tipoCliente, setTipoCliente] = useState<string | number>("");
  const [documentos, setDocumentos] = useState<IDocumento[]>([
    { id: 0, tipo: "", numero: "", dataExpedicao: null },
  ]);
  const [telefones, setTelefones] = useState<ITelefone[]>([
    { id: 0, ddd: "", numero: "" },
  ]);

  const clienteOptions = [
    { value: 0, label: "Titular" },
    { value: 1, label: "Dependente" },
  ];

  const tiposDocumentos = [
    { value: "CPF", label: "Cadastro de Pessoas Física" },
    { value: "RG", label: "Registro Geral" },
    { value: "Passaporte", label: "Passaporte" },
  ];

  function handleTipoClienteValue(e: SelectChangeEvent<string | number>) {
    setTipoCliente(e.target.value);
  }

  function handleDocumentoChange(
    index: number,
    field: keyof IDocumento,
    value: any
  ) {
    const newDocumentos = documentos.map((documento, idx) =>
      idx === index ? { ...documento, [field]: value } : documento
    );
    setDocumentos(newDocumentos);
  }

  function handleChangeTelefone(index: number, field: keyof ITelefone, value: string) {
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
  function addDocumento() {
    setDocumentos([
      ...documentos,
      { id: documentos.length, tipo: "", numero: "", dataExpedicao: null },
    ]);
  }

  function removeDocumento(index: number) {
    const newDocumentos = documentos.filter(
      (documento) => documento.id !== index
    );
    setDocumentos(newDocumentos);
  }
  return (
    <Box margin={5} display={"flex"} flexDirection={"column"} gap={1}>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography variant="h5">Informações do Cliente</Typography>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Seletor
            title="Tipo de Cliente"
            value={tipoCliente}
            options={clienteOptions}
            handleChangeValue={handleTipoClienteValue}
          />

          <TextField
            id="outlined-basic"
            label="Nome"
            placeholder="Digite seu nome"
            multiline
            fullWidth
          />

          <TextField
            id="outlined-basic"
            label="E-Mail"
            placeholder="Digite seu e-mail"
            multiline
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                label="Data de Nascimento"
                format="DD/MM/YYYY"
                fullWidth
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
      <Box height="100%" display="flex" flexDirection="column" gap={1}>
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
              onChange={(event) =>
                handleDocumentoChange(index, "numero", event.target.value)
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
            {documentos.length > 1 ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeDocumento(index)}
              >
                Remover Documento
              </Button>
            ) : (
              <></>
            )}
          </Box>
        ))}
        <Button variant="outlined" onClick={addDocumento}>
          Adicionar Documento
        </Button>
      </Box>
      <Box height="100%" display="flex" flexDirection="column" gap={1}>
        <Typography variant="h5">Telefone</Typography>
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
              onChange={(e) => handleChangeTelefone(index, "ddd", e.target.value)}
            />
            <TextField
              id={`numero-${index}`}
              label="Número"
              placeholder="Digite o número do telefone"
              fullWidth
              value={telefone.numero}
              onChange={(e) => handleChangeTelefone(index, "numero", e.target.value)}
            />
            {telefones.length > 1 ? (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeTelefone(index)}
                sx={{ minWidth: "100px" }}
              >
                Remover
              </Button>
            ) : (
              <></>
            )}
          </Box>
        ))}
        <Button variant="outlined" color="primary" onClick={addTelefone}>
          Adicionar Telefone
        </Button>
      </Box>
      <Box height="100%" display="flex" flexDirection="column" gap={1}>
        <Typography variant="h5">Endereço</Typography>
        <Box display="flex" flexDirection={smDown ? "column" : "row"} gap={1}>
          <TextField
            id="outlined-basic"
            label="CEP"
            placeholder="Digite a cep do seu endereço"
            multiline
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Cidade"
            placeholder="Digite a cidade do seu endereço"
            multiline
            fullWidth
          />
        </Box>
        <Box display="flex" flexDirection={smDown ? "column" : "row"} gap={1}>
          <TextField
            id="outlined-basic"
            label="Rua"
            placeholder="Digite a rua do seu endereço"
            multiline
            fullWidth
          />

          <TextField
            id="outlined-basic"
            label="Estado"
            placeholder="Digite o estado do seu endereço"
            multiline
            fullWidth
          />

          <TextField
            id="outlined-basic"
            label="Numero"
            placeholder="Digite a numero do seu endereço"
            multiline
            fullWidth
          />
        </Box>
      </Box>
      <Button variant="outlined" color="secondary" >
          Salvar Cliente
        </Button>
    </Box>
  );
}
