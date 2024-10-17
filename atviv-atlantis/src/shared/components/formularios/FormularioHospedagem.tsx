import {
  Box,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Seletor } from "../seletor/Seletor";
import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { IHospedagem } from "../../interfaces";

interface FormularioHospedagemProps {
  onSaveHospedagem: (hospedagem: IHospedagem) => void;
  hospedagemEditavel?: IHospedagem;
}

const reservasExistentes: { [key: string]: { inicio: Date; fim: Date }[] } = {
  "Solteiro Simples": [
    { inicio: new Date(2024, 10, 10), fim: new Date(2024, 10, 15) }, // 10 a 15 de novembro
    { inicio: new Date(2024, 10, 20), fim: new Date(2024, 10, 25) }, // 20 a 25 de novembro
  ],
  "Casal Simples": [
    { inicio: new Date(2024, 10, 5), fim: new Date(2024, 10, 8) }, // 5 a 8 de novembro
    { inicio: new Date(2024, 10, 15), fim: new Date(2024, 10, 20) }, // 15 a 20 de novembro
  ],
  "Familia Simples": [
    { inicio: new Date(2024, 10, 1), fim: new Date(2024, 10, 7) }, // 1 a 7 de novembro
  ],
  "Familia Mais": [
    { inicio: new Date(2024, 10, 12), fim: new Date(2024, 10, 18) }, // 12 a 18 de novembro
  ],
  "Solteiro Mais": [
    { inicio: new Date(2024, 10, 8), fim: new Date(2024, 10, 14) }, // 8 a 14 de novembro
  ],
  "Familia Super": [
    { inicio: new Date(2024, 10, 2), fim: new Date(2024, 10, 6) }, // 2 a 6 de novembro
  ],
};

export function FormularioHospedagem({
  onSaveHospedagem,
  hospedagemEditavel,
}: FormularioHospedagemProps) {
  const [tipoAcomodacao, setTipoAcomodacao] = useState<string | number>("");
  const [dataInicial, setDataInicial] = useState<Dayjs | null>(null);
  const [dataFinal, setDataFinal] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (hospedagemEditavel) {
      setTipoAcomodacao(hospedagemEditavel.tipoAcomodacao);
      setDataInicial(hospedagemEditavel.dataInicial);
      setDataFinal(hospedagemEditavel.dataFinal);
    }
  }, [hospedagemEditavel]);

  function handleTipoAcomodacaoValue(e: SelectChangeEvent<string | number>) {
    setDataInicial(null)
    setDataFinal(null)
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

  // Função para verificar se a data está reservada
  const isDateReserved = (
    date: Date,
    reservas: { inicio: Date; fim: Date }[]
  ): boolean => {
    return reservas.some(
      (reserva) => date >= reserva.inicio && date <= reserva.fim
    );
  };

  // Função para desabilitar datas reservadas no calendário
  const shouldDisableDate = (date: Dayjs) => {
    const jsDate = date.toDate();
    const today = new Date()
    today.setHours(0, 0, 0, 0); 
    return (
      isDateReserved(jsDate, reservasExistentes[tipoAcomodacao] || []) ||
      jsDate < today
    );
  };

  // Opções de acomodação
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
      label: "Acomodação para até duas famílias, casal e três crianças cada",
    },
  ];

  return (
    <Box margin={3} display={"flex"} flexDirection={"column"} gap={2}>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Seletor
          title="Tipo de Acomodação"
          value={tipoAcomodacao}
          options={acomodacaoOptions}
          handleChangeValue={(e) => handleTipoAcomodacaoValue(e)}
        />
        {tipoAcomodacao !== "" && (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DatePicker
                label="Data Inicial"
                format="DD/MM/YYYY"
                value={dataInicial}
                onChange={(newValue) => setDataInicial(newValue)}
                shouldDisableDate={shouldDisableDate}
              />
              <DatePicker
                label="Data Final"
                format="DD/MM/YYYY"
                value={dataFinal}
                onChange={(newValue) => setDataFinal(newValue)}
                shouldDisableDate={shouldDisableDate}
              />
            </LocalizationProvider>
          </>
        )}
      </Box>

      <Box display={"flex"} justifyContent={"center"}>
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
