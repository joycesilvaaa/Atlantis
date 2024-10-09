import { useState } from "react";
import { BuscaCliente } from "../../components/busca/BuscaCliente";
import { ICliente } from "../../interfaces/ICliente";
import { IHospedagem } from "../../interfaces";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Box, Button} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface BuscaHospedagemProps{
    onHospedagemChange: (hospedagem: IHospedagem) => void
}

export function BuscaHospedagem({ onHospedagemChange }: BuscaHospedagemProps) {
  const [cliente, setCliente] = useState<ICliente | null>(null);
  const [hospedagem, setHospedagem] = useState<IHospedagem | null>(null);
  const [dataInicial, setDataInicial] = useState<Dayjs | null>(null);
  const [dataFinal, setDataFinal] = useState<Dayjs | null>(null);

  function handleClienteChange(cliente: ICliente | null) {
    console.log(cliente);
    setCliente(cliente);
  }

  function handleSubmit() {
    if (cliente && dataInicial && dataFinal) {
      const novaHospedagem: IHospedagem = {
        tipoAcomodacao: "Solteiro Simples",
        dataInicial: dataInicial,
        dataFinal: dataFinal,
      };

      onHospedagemChange(novaHospedagem);
    } else {
      console.log("Preencha todos os campos antes de cadastrar.");
    }
  }

  return (
    <Box>
      <BuscaCliente onClientChange={handleClienteChange} />
      {cliente && cliente.titular && (<>
      <Box display={"flex"} flexDirection={"column"} gap={1} margin={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField"]}>
            <DateField
              label="Data de Inicial"
              format="DD/MM/YYYY"
              fullWidth
              value={dataInicial}
              onChange={(e: Dayjs | null) => setDataInicial(e)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField"]}>
            <DateField
              label="Data de Final"
              format="DD/MM/YYYY"
              fullWidth
              value={dataFinal}
              onChange={(e: Dayjs | null) => setDataFinal(e)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Buscar Hospedagem
        </Button>
      </Box>
      </>)}
    </Box>
  );
}
