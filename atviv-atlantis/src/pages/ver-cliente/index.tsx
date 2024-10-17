import { Box, Button } from "@mui/material";
import { ICliente } from "../../shared/interfaces";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { BuscaCliente } from "../../shared/components/busca/BuscaCliente";
import { useEffect, useState } from "react";
import { VerDetalheCliente } from "../../shared/components/lista/VerDetalheCliente";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

export function VerCliente() {
  const [cliente, setCliente] = useState<ICliente | null>(null);
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate()

  useEffect(() => {
    if (id === "123") {
      const clienteTeste: ICliente = {
        nome: "Joyce",
        email: "joyce@gmail.com",
        dataNascimento: dayjs("1990-05-15"),
        documentos: [
          {
            tipo: "CPF",
            numero: "123.456.789-00",
            dataExpedicao: dayjs("2022-01-01"),
          },
          {
            tipo: "RG",
            numero: "12.345.678-9",
            dataExpedicao: dayjs("2022-02-01"),
          },
        ],
        telefones: [
          { ddd: "11", numero: "91234-5678" },
          { ddd: "11", numero: "98765-4321" },
        ],
        endereco: {
          rua: "Avenida Exemplo",
          numero: "123",
          cep: "01234-567",
          cidade: "São Paulo",
          estado: "SP",
        },
        titular: true,
      };
      setCliente(clienteTeste);
    }
  }, [id]);

  function handleClienteChange(cliente: ICliente | null) {
    console.log(cliente);
    setCliente(cliente);
  }

  function handleClickVoltar(){
    navigate('/listagem-clientes')
  }

  function handleClickBuscarCliente(){
    setCliente(null)
    navigate("/ver-cliente");
  }

  return (
    <LayoutBaseDePagina title="Ver Cliente">
      {!cliente && <BuscaCliente onClientChange={handleClienteChange} />}
      <Box>
        {cliente && (
          <>
            <VerDetalheCliente cliente={cliente} />
            <Box display={"flex"} justifyContent={"center"} gap={1} margin={"10px"}>
              <Button variant="outlined" color="secondary" onClick={handleClickVoltar}>
              Listagem de Clientes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClickBuscarCliente}>
              Buscar outro cliente
            </Button>
            </Box>
          </>
        )}
      </Box>
    </LayoutBaseDePagina>
  );
}
