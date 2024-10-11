import { Box, Button, SelectChangeEvent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Seletor } from "../seletor/Seletor";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { IHospedagem } from "../../interfaces";

interface FormularioHospedagemProps {
  onSaveHospedagem: (hospedagem: IHospedagem) => void;
  hospedagemEditavel?: IHospedagem
}
export function FormularioHospedagem({
  onSaveHospedagem, hospedagemEditavel
}: FormularioHospedagemProps) {
  const [tipoAcomodacao, setTipoAcomodacao] = useState<string | number>("");
  const [dataInicial, setDataInicial] = useState<Dayjs | null>(null);
  const [dataFinal, setDataFinal] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (hospedagemEditavel) {
      setTipoAcomodacao(hospedagemEditavel.tipoAcomodacao)
      setDataInicial(hospedagemEditavel.dataInicial)
      setDataFinal(hospedagemEditavel.dataFinal)
    }
  }, [hospedagemEditavel]);

  function handleTipoAcomodacaoValue(e: SelectChangeEvent<string | number>) {
    setTipoAcomodacao(e.target.value);
  }

  function handleSubmit() {
    if (dataInicial && dataFinal) {
      const hospedagem: IHospedagem = {
        tipoAcomodacao: tipoAcomodacao as string,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
      };
      onSaveHospedagem(hospedagem);
    }
  }
  const acomodacaoOptions = [
    { value: "Solteiro Simples", label: "Acomodação simples para solteiro(a)" },
    { value: "Casal Simples", label: "Acomodação simples para casal" },
    {
      value: "Familia Simples",
      label: "Acomodação para família com até duas crianças",
    },
    {
      value: "Familia Mais",
      label: "Acomodação para família com até cinco crianças",
    },
    {
      value: "Solteiro Mais",
      label: "Acomodação com garagem para solteiro(a)",
    },
    {
      value: "Familia Super",
      label: "Acomodação para até duas familias, casal e três crianças cada",
    },
  ];
  return (
    <Box margin={3} display={"flex"} flexDirection={"column"} gap={2}>
      <Seletor
        title="Tipo de Acomodação"
        value={tipoAcomodacao}
        options={acomodacaoOptions}
        handleChangeValue={handleTipoAcomodacaoValue}
      />
      <Box display={"flex"} flexDirection={"column"} gap={1}>
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
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
