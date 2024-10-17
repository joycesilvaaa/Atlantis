import { Box, Divider, Typography } from "@mui/material";
import { IAcomodacao } from "../../interfaces";

interface VerAcomodacao {
  acomodacao: IAcomodacao;
}

export function CardAcomodacao({ acomodacao }: VerAcomodacao) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      margin={2}
      padding={4}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px", // Maximum width for the card
        width: "100%", // Ensures it scales within the container
      }}
    >
      <Typography variant="h6">Acomodação</Typography> {/* Adjusted to h6 for a smaller but prominent title */}
      <Divider sx={{ marginY: 2 }} /> {/* Added margin between title and content */}
      <Typography variant="body1"><strong>Tipo:</strong> {acomodacao.tipo}</Typography> {/* Consistent with body1 */}
      <Typography variant="body1"><strong>Descrição:</strong> {acomodacao.descricao}</Typography> {/* Consistent with body1 */}
    </Box>
  );
}
