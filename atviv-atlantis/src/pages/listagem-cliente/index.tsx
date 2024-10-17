import { Box, SelectChangeEvent } from "@mui/material";
import {  Seletor } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useState } from "react";
import { CardCliente } from "../../shared/components/lista/CardCliente";
import { ICliente, IDocumento, ITelefone } from "../../shared/interfaces";
import dayjs from "dayjs";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";


export function ListagemCliente() {
  const [tipoListagem, setTipoListagem] = useState<string | number>("")
  const [cliente, setCliente] = useState<ICliente | null>(null)

  function handleTipoClienteValue(e: SelectChangeEvent<string | number>) {
    setTipoListagem(e.target.value)
    
  }

  function handleClienteChange(cliente: ICliente | null) {
    console.log(cliente);
    setCliente(cliente);
  }

  const listagemOptions = [
    { value: 0, label: "Todos os titulares" },
    { value: 1, label: "Dependentes de um titular específico" },
    { value: 2, label: "Titular de um dependente específico" },
  ];

  const clientes: ICliente[] = [
    {
      nome: "João Silva",
      email: "joao.silva@example.com",
      dataNascimento: dayjs("1990-05-15"),
      documentos: [
        { tipo: "CPF", numero: "123.456.789-00" } as IDocumento,
      ],
      telefones: [
        { ddd: "(11)", numero: "98765-4321" } as ITelefone,
      ],
      endereco: {
        rua: "Rua das Flores",
        numero: "123",
        cep: "12345-678",
        cidade: "São Paulo",
        estado: "SP",
      },
      titular: true,
    },
    {
      nome: "Maria Souza",
      email: "maria.souza@example.com",
      dataNascimento: dayjs("1985-10-20"),
      documentos: [
        { tipo: "CPF", numero: "987.654.321-00" } as IDocumento,
      ],
      telefones: [
        { ddd: "(11)", numero: "3322-4455" } as ITelefone,
      ],
      endereco: {
        rua: "Avenida Paulista",
        numero: "456",
        cep: "98765-432",
        cidade: "São Paulo",
        estado: "SP",
      },
      titular: false,
    },
    {
      nome: 'Joyce',
      email: 'joyce@gmail.com',
      dataNascimento: dayjs('1990-05-15'), 
      documentos: [
          { tipo: 'CPF', numero: '123', dataExpedicao: dayjs('2022-01-01') },
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
  },
    {
      nome: "Maria Souza",
      email: "maria.souza@example.com",
      dataNascimento: dayjs("1985-10-20"),
      documentos: [
        { tipo: "CPF", numero: "987.654.321-00" } as IDocumento,
      ],
      telefones: [
        { ddd: "(11)", numero: "3322-4455" } as ITelefone,
      ],
      endereco: {
        rua: "Avenida Paulista",
        numero: "456",
        cep: "98765-432",
        cidade: "São Paulo",
        estado: "SP",
      },
      titular: false,
    },
  ];

  return (
    <LayoutBaseDePagina title="Listagem">
      <Box display={"flex"} flexDirection={"column"} gap={1} >
        <Box marginLeft={3} marginRight={3} marginTop={3}>
         <Seletor
          title="Tipo de Listagem"
          value={tipoListagem}
          options={listagemOptions}
          handleChangeValue={handleTipoClienteValue}
        /> 
        </Box>
        
      
      <Box display={"flex"} flexDirection={"row"} flexWrap="wrap" >
      {tipoListagem === 0  && clientes.map((cliente, index) => (
        <Box display={"flex"} marginLeft={2}>
          <CardCliente key={index} cliente={cliente} />
        </Box>
          
        ))}
       {tipoListagem === 1 && (
          <>
          <Box width={'100%'}>
            <BuscaCliente onClientChange={handleClienteChange} />
          </Box>
          <Box display={'flex'} marginLeft={2}>
            {cliente &&
              clientes
                .filter((c) => c.titular)
                .map((cliente, index) => <CardCliente key={index} cliente={cliente} />)}
          </Box>
            
          </>
        )}
        {tipoListagem === 2 && (
          <>
            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <BuscaCliente onClientChange={handleClienteChange} />
          </Box>
          <Box marginLeft={2}display={'flex'}>
            {cliente &&
              clientes
                .filter((c) => c.titular === false)
                .map((cliente, index) => <CardCliente key={index} cliente={cliente} />)}
          </Box>
            
          </>
        )}
      
      </Box></Box>
    </LayoutBaseDePagina>
  );
}