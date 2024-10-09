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
import { useState, useEffect } from "react";
import { Seletor } from "../seletor/Seletor";
import dayjs, { Dayjs } from "dayjs";
import { ICliente, IEndereco } from "../../interfaces";

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

interface FormularioClienteProps {
  onSaveCliente: (cliente: ICliente) => void;
  clienteEditavel?: ICliente;
}

export function FormularioCliente({ onSaveCliente, clienteEditavel }: FormularioClienteProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState<Dayjs | null>(null);
  const [endereco, setEndereco] = useState<IEndereco>({
    rua: "",
    numero: "",
    cep: "",
    cidade: "",
    estado: "",
  });
  const [documentos, setDocumentos] = useState<IDocumento[]>([
    { id: 0, tipo: "", numero: "", dataExpedicao: null },
  ]);
  const [telefones, setTelefones] = useState<ITelefone[]>([
    { id: 0, ddd: "", numero: "" },
  ]);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const tiposDocumentos = [
    { value: "CPF", label: "Cadastro de Pessoas Física" },
    { value: "RG", label: "Registro Geral" },
    { value: "Passaporte", label: "Passaporte" },
  ];


  useEffect(() => {
    if (clienteEditavel) {
      setNome(clienteEditavel.nome);
      setEmail(clienteEditavel.email);
      setDataNascimento(clienteEditavel.dataNascimento);
      setEndereco(clienteEditavel.endereco);
      setDocumentos(clienteEditavel.documentos.map((doc, index) => ({
        id: index, 
        tipo: doc.tipo,
        numero: doc.numero,
        dataExpedicao: doc.dataExpedicao,
      })));
      setTelefones(clienteEditavel.telefones.map((tel, index) => ({
        id: index, 
        ddd: tel.ddd,
        numero: tel.numero,
      })));
    }
  }, [clienteEditavel]);

  function handleSubmit() {
    const cliente: ICliente = {
      nome: nome,
      email: email,
      dataNascimento: dataNascimento as Dayjs,
      documentos: documentos.map((documento) => ({
        tipo: documento.tipo,
        numero: documento.numero,
        dataExpedicao: documento.dataExpedicao as Dayjs,
      })),
      telefones: telefones.map((telefone) => ({
        ddd: telefone.ddd,
        numero: telefone.numero,
      })),
      endereco: {
        rua: endereco.rua,
        numero: endereco.numero,
        cep: endereco.cep,
        cidade: endereco.cidade,
        estado: endereco.estado,
      },
      titular: false,
    };

    onSaveCliente(cliente);
  }

  function handleNomeChange(value: string){
    setNome(value)
  }

  function handleEmailChange(value:string){
    setEmail(value)
  }

  function handleDataNascimento(data: any){
    setDataNascimento(data)
  }
  
  function handleEnderecoChange(filter: keyof IEndereco, value: string) {
    setEndereco((prevEndereco) => ({
      ...prevEndereco,
      [filter]: value,
    }));
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
    <Box margin={5} display={"flex"} flexDirection={"column"} gap={2}>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography variant="h5">Informações do Cliente</Typography>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <TextField
            id="outlined-basic"
            label="Nome"
            placeholder="Digite seu nome"
            multiline
            fullWidth
            value={nome}
            onChange={(e)=> handleNomeChange(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="E-Mail"
            placeholder="Digite seu e-mail"
            multiline
            fullWidth
            value={email}
            onChange={(e)=> handleEmailChange(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                label="Data de Nascimento"
                format="DD/MM/YYYY"
                fullWidth
                value={dataNascimento}
                onChange={(e)=> handleDataNascimento(e)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
      <Box height="100%" display="flex" flexDirection="column" gap={2}>
        <Typography variant="h5">Documentos</Typography>
        {documentos.map((documento, index) => (
          <Box key={index} display="flex" flexDirection="column" gap={2}>
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
      <Box height="100%" display="flex" flexDirection="column" gap={2}>
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
      <Box height="100%" display="flex" flexDirection="column" gap={2}>
        <Typography variant="h5">Endereço</Typography>
        <Box display="flex" flexDirection={smDown ? "column" : "row"} gap={2}>
          <TextField
            id="outlined-basic"
            label="CEP"
            placeholder="Digite a cep do seu endereço"
            multiline
            fullWidth
            value={endereco?.cep}
            onChange={(e) => handleEnderecoChange('cep', e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Cidade"
            placeholder="Digite a cidade do seu endereço"
            multiline
            fullWidth
          />
        </Box>
        <Box display="flex" flexDirection={smDown ? "column" : "row"} gap={2}>
          <TextField
            id="outlined-basic"
            label="Rua"
            placeholder="Digite a rua do seu endereço"
            multiline
            fullWidth
            value={endereco?.rua}
            onChange={(e) => handleEnderecoChange('rua', e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Estado"
            placeholder="Digite o estado do seu endereço"
            multiline
            fullWidth
            value={endereco?.estado}
            onChange={(e) => handleEnderecoChange('estado', e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Numero"
            placeholder="Digite a numero do seu endereço"
            multiline
            fullWidth
            value={endereco?.numero}
            onChange={(e) => handleEnderecoChange('numero', e.target.value)}
          />
        </Box>
      </Box>
      <Button variant="outlined" color="secondary" onClick={handleSubmit} >
          Salvar Cliente
        </Button>
    </Box>
  );
}
