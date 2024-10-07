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
  import { Seletor } from "../../seletor/Seletor";
  import { Dayjs } from "dayjs";
  import { Documento, ICliente, IEndereco, Telefone } from "../../../interfaces";
import { FormularioTelefones } from "./FomularioTelefones";
import { FormularioDocumento } from "./FormularioDocumento";
import { FormularioEndereco } from "./FormularioEndereco";
  

interface FormularioClienteProps{
    onSaveCliente: () =>void
  }
  export function FormularioClienteTitular({ onSaveCliente} : FormularioClienteProps) {
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
    const [documentos, setDocumentos] = useState<Documento[]>([
      { id: 0, tipo: "", numero: "", dataExpedicao: null },
    ]);
    const [telefones, setTelefones] = useState<Telefone[]>([
      { id: 0, ddd: "", numero: "" },
    ]);
  
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
        titular: false
      };
      console.log(cliente);
    }
    function handleChangeEndereco(endereco: IEndereco){
        setEndereco(endereco)
    }

    function handleChangeTelefones(telefones: Telefone[]){
        setTelefones(telefones)
    }

    function handleChangeDocumentos(documentos: Documento[]){
        setDocumentos(documentos)
    }
    return (
      <Box margin={5} display={"flex"} flexDirection={"column"} gap={1}>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Typography variant="h5">Informações do Cliente</Typography>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
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
        <FormularioDocumento onChangeDocumentos={handleChangeDocumentos}/>
        <FormularioTelefones onChangeTelefones={handleChangeTelefones}/>
          <FormularioEndereco onChangeEndereco={handleChangeEndereco}/>
        <Button variant="outlined" color="secondary" onClick={handleSubmit} >
            Salvar Cliente
          </Button>
      </Box>
    );
  }
  