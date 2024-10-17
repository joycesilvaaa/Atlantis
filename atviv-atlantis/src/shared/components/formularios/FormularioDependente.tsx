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
  import { useEffect, useState } from "react";
  import { Seletor } from "../seletor/Seletor";
  import { Dayjs } from "dayjs";
import { Documento, ICliente, IDependente } from "../../interfaces";
import { DatePicker } from "@mui/x-date-pickers";
  
interface FormularioDependenteProps{
    onSaveDependente: (dependete: IDependente)=> void
    clienteEditavel?: ICliente;
}
  
  export function FormularioDependente({onSaveDependente, clienteEditavel}: FormularioDependenteProps) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState<Dayjs | null>(null);
    const [documentos, setDocumentos] = useState<Documento[]>([
      { id: 0, tipo: "", numero: "", dataExpedicao: null },
    ])
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
        setDocumentos(clienteEditavel.documentos.map((doc, index) => ({
          id: index, 
          tipo: doc.tipo,
          numero: doc.numero,
          dataExpedicao: doc.dataExpedicao,
        })));
      }
    }, [clienteEditavel]);

    function handleSubmit() {
        const cliente: IDependente = {
          nome: nome,
          email: email,
          dataNascimento: dataNascimento as Dayjs, 
          documentos: documentos.map((documento) => ({
            tipo: documento.tipo,
            numero: documento.numero,
            dataExpedicao: documento.dataExpedicao as Dayjs,
          })),
          titular: false
        };
        onSaveDependente(cliente)
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
      <Box margin={3} display={"flex"} flexDirection={"column"} gap={1}>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Typography variant="h5">Informações do Cliente</Typography>
          <Box display={"flex"} flexDirection={"column"} gap={1}>
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
              <Box  display="flex" gap={1} alignItems={smDown? 'center': 'flex-end'} flexDirection={smDown ? "column" : "row"}>
              <TextField
               label="Número do Documento"
               placeholder="Digite o número do documento"
               value={documento.numero}
               onChange={(event) =>
                 handleDocumentoChange(index, "numero", event.target.value)
               }
               fullWidth
             />
             <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
               <DemoContainer components={["DateField"]}>
                 <DatePicker
                   label="Data de Expedição"
                   value={documento.dataExpedicao}
                   onChange={(newValue) =>
                     handleDocumentoChange(index, "dataExpedicao", newValue)
                   }
                   format="DD/MM/YYYY"
                 />
               </DemoContainer>
             </LocalizationProvider> 
             </Box>
             
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
        <Button variant="outlined" color="secondary" onClick={handleSubmit} >
          Salvar Cliente
        </Button>
      </Box>
    );
  }
  