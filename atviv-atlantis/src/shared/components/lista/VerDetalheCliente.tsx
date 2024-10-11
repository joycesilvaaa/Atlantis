import { Typography, Box, List, ListItem, Divider } from "@mui/material";
import { ICliente } from "../../../shared/interfaces";

interface ClienteProps {
  cliente: ICliente;
}

export function VerDetalheCliente({ cliente }: ClienteProps) {
  return (
      <Box margin={3} padding={5} sx={{ border: "1px solid #ccc", borderRadius: "8px" }} >
        <Typography variant="h5">Detalhes do Cliente</Typography>
        <Divider/>
        <Typography variant="subtitle1">Nome: {cliente.nome}</Typography>
        <Typography variant="subtitle1">Email: {cliente.email}</Typography>
        <Typography variant="subtitle1">
          Data de Nascimento: {cliente.dataNascimento.format("DD/MM/YYYY")}
        </Typography>
        <Typography variant="h6">Documentos:</Typography>
        <List>
          {cliente.documentos.map((doc, index) => (
            <ListItem key={index}>
              <Typography>
            {doc.tipo}: {doc.numero}
             </Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Telefones:</Typography>
        <List>
          {cliente.telefones.map((telefone, index) => (
            <ListItem key={index}>
              <Typography>
       {telefone.ddd} {telefone.numero}
        </Typography>
              
            </ListItem>
          ))}
        </List>
        <Typography variant="h6">Endereço:</Typography>
        <Typography>
          {cliente.endereco.rua}, {cliente.endereco.numero},{" "}
          {cliente.endereco.cep}
        </Typography>
        <Typography>
          {cliente.endereco.cidade} - {cliente.endereco.estado}
        </Typography>
        <Typography variant="subtitle1">
          Titular: {cliente.titular ? "Sim" : "Não"}
        </Typography>
      </Box>
  );
}
