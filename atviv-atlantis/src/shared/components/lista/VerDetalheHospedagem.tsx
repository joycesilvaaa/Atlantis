import { Box, Divider, Typography } from "@mui/material"
import { IHospedagem } from "../../interfaces"

interface VerHospedagemProps{
    hospedagem: IHospedagem
}

export function VerDetalheHospedagem({  hospedagem }: VerHospedagemProps){
    return(
        <Box display={"flex"}  flexDirection={"column"} margin={2} padding={4} sx={{ border: "1px solid #ccc", borderRadius: "8px" }} >
            <Typography variant="h5">Hospedagem</Typography>
            <Divider/>
        <Typography variant="subtitle1">Nome: {hospedagem.cliente?.nome}</Typography>
        <Typography variant="subtitle1">Email: {hospedagem.cliente?.email}</Typography>
        <Typography variant="subtitle1">Acomodação: {hospedagem.tipoAcomodacao}</Typography>
        <Typography variant="subtitle1">
          Data de Inicial: {hospedagem.dataInicial.format("DD/MM/YYYY")}
        </Typography>
        <Typography variant="subtitle1">
          Data de Final: {hospedagem.dataFinal.format("DD/MM/YYYY")}
        </Typography>
        </Box>
        
    )
}