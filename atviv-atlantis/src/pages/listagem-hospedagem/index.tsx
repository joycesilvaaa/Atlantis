import { Box, Button, SelectChangeEvent } from "@mui/material";
import {  Seletor } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState } from "react";
import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { CardCliente } from "../../shared/components/lista/CardCliente";
import { IAcomodacao, ICliente, IDocumento, IHospedagem, ITelefone } from "../../shared/interfaces";
import dayjs, { Dayjs } from "dayjs";
import { DataObject } from "@mui/icons-material";
import { VerDetalheHospedagem } from "../../shared/components/lista/VerDetalheHospedagem";
import { CardAcomodacao } from "../../shared/components/lista/CardAcomodacao";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export function ListagemHospedagem() {
  const [tipoListagem, setTipoListagem] = useState<string | number>("")
  const [dataInicial, setDataInicial] = useState<Dayjs | null>(null);
  const [dataFinal, setDataFinal] = useState<Dayjs | null>(null)
  const [hospedagem, setHospedagem] = useState<IHospedagem[]>([])

  function handleTipoHospedagemValue(e: SelectChangeEvent<string | number>) {
    setDataInicial(null)
    setDataFinal(null)
    setHospedagem([])
    setTipoListagem(e.target.value)
  }

  function handleBusca(){
    const hospedagens: IHospedagem[] = [
      {
        cliente: {
          nome: "João Silva",
          email: "joao.silva@example.com",
          dataNascimento: dayjs("1990-05-15"),
          documentos: [
            { 
              tipo: "CPF", 
              numero: "123.456.789-00", 
              dataExpedicao: dayjs("2010-01-01") 
            }
          ],
          telefones: [{ ddd: "(11)", numero: "98765-4321" }],
          endereco: {
            rua: "Rua das Flores",
            numero: "123",
            cep: "12345-678",
            cidade: "São Paulo",
            estado: "SP",
          },
          titular: true,
        },
        tipoAcomodacao: "Solteiro Simples",
        dataInicial: dayjs("2024-05-15"),
        dataFinal: dayjs("2024-05-20"),
      },
      {
        cliente: {
          nome: "Maria Souza",
          email: "maria.souza@example.com",
          dataNascimento: dayjs("1985-08-20"),
          documentos: [
            { 
              tipo: "RG", 
              numero: "987654321", 
              dataExpedicao: dayjs("2005-06-10") 
            }
          ],
          telefones: [{ ddd: "(21)", numero: "91234-5678" }],
          endereco: {
            rua: "Avenida Brasil",
            numero: "456",
            cep: "23456-789",
            cidade: "Rio de Janeiro",
            estado: "RJ",
          },
          titular: true,
        },
        tipoAcomodacao: "Casal Deluxe",
        dataInicial: dayjs("2024-06-01"),
        dataFinal: dayjs("2024-06-07"),
      },
      {
        cliente: {
          nome: "Carlos Pereira",
          email: "carlos.pereira@example.com",
          dataNascimento: dayjs("1975-11-30"),
          documentos: [
            { 
              tipo: "Passaporte", 
              numero: "A12345678", 
              dataExpedicao: dayjs("2018-03-15") 
            }
          ],
          telefones: [{ ddd: "(31)", numero: "93456-7890" }],
          endereco: {
            rua: "Rua Minas Gerais",
            numero: "789",
            cep: "34567-890",
            cidade: "Belo Horizonte",
            estado: "MG",
          },
          titular: true,
        },
        tipoAcomodacao: "Suíte Presidencial",
        dataInicial: dayjs("2024-07-10"),
        dataFinal: dayjs("2024-07-15"),
      }
    ];
    setHospedagem(hospedagens)
  }

  const listagemOptions = [
    { value: 0, label: "Todas acomodações" },
    { value: 1, label: "Hospedagens por período" },
    { value: 2, label: "Hospedagens por cliente" },
  ];

  

  const acomadacoes: IAcomodacao[] = [
    {
      tipo: "Solteiro Simples",
      descricao: "Acomodação simples para solteiro(a)",
    },
    {
      tipo: "Casal Simples",
      descricao: "Acomodação simples para casal",
    },
    {
      tipo: "Familia Simples",
      descricao: "Acomodação para família com até duas crianças",
    },
    {
      tipo: "Familia Mais",
      descricao: "Acomodação para família com até cinco crianças",
    },
    {
      tipo: "Solteiro Mais",
      descricao: "Acomodação com garagem para solteiro(a)",
    },
    {
      tipo: "Familia Super",
      descricao: "Acomodação para até duas famílias, casal e três crianças cada",
    },
  ]
    

  return (
    <LayoutBaseDePagina title="Listagem">
      <Box margin={3}>
        <Seletor
          title="Tipo de Listagem"
          value={tipoListagem}
          options={listagemOptions}
          handleChangeValue={handleTipoHospedagemValue}
        />
      </Box>
      <Box display={"flex"} flexDirection={"row"} flexWrap="wrap" justifyContent="center">
      {tipoListagem === 0 && acomadacoes.map((acomodacao, index) => (
          <CardAcomodacao key={index} acomodacao={acomodacao}/>
        ))}

      {tipoListagem === 1 && (
        <>
        <Box display={"flex"} flexDirection={'column'} width={"100%"} gap={2} marginLeft={3} marginRight={3}>
         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DatePicker
                label="Data Inicial"
                format="DD/MM/YYYY"
                value={dataInicial}
                onChange={(newValue) => setDataInicial(newValue)}
              />
              <DatePicker
                label="Data Final"
                format="DD/MM/YYYY"
                value={dataFinal}
                onChange={(newValue) => setDataFinal(newValue)}
              />
            </LocalizationProvider>
            <Button variant="outlined" color="secondary" onClick={handleBusca}  >
          Buscar
        </Button> 
        </Box>
        {hospedagem.length > 0 ? (
          <>
          hospedagem.map((hospegem, index) =>(
             <VerDetalheHospedagem />
          ))
         
          </>

        )}
        
        
        </>
      )}
      
      
      </Box>
    </LayoutBaseDePagina>
  );
}