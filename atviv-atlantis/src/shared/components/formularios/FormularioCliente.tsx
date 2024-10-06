import { Box, TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function FormularioCliente() {
  return (
    <Box margin={2}>
      <div>
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Tipo de Cliente</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tipo de Cliente"
          >
            <MenuItem value="">
              <em>Selecione um tipo de cliente</em>
            </MenuItem>
            <MenuItem value={0}>Titular</MenuItem>
            <MenuItem value={1}>Dependente</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="outlined-basic"
          label="Nome"
          placeholder="Digite seu nome"
          multiline
          fullWidth
        />

        <TextField
          id="outlined-basic"
          label="E-Mail"
          placeholder="Digite seu e-mail"
          multiline
          fullWidth
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField"]}>
            <DateField
              label="Data de Nascimento"
              format="DD/MM/YYYY"
              fullWidth
            />
          </DemoContainer>
        </LocalizationProvider>

        <Box height="100%" display="flex" flexDirection="column" gap={1} margin={1}>
        <Typography variant="h5">Documentos</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de Documento</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tipo de Documento"
          >
            <MenuItem value="">
              <em>Selecione um tipo de documento</em>
            </MenuItem>
            <MenuItem value={0}>CPF</MenuItem>
            <MenuItem value={1}>RG</MenuItem>
            <MenuItem value={2}>Passaporte</MenuItem>
          </Select>
        </FormControl>
        <Box display="flex" flexDirection="column" gap={1} >
          <TextField
            id="outlined-basic"
            label="Número do Documento"
            placeholder="Digite o número do documento"
            multiline
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]}>
              <DateField
                label="Data de Expedição"
                format="DD/MM/YYYY"
                fullWidth
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
        <Box height="100%" display="flex" flexDirection="column" gap={1} margin={1}>
          <Typography variant="h5">Telefone</Typography>
          <Box display="flex" flexDirection={"row"} gap={1}>
            <TextField
              id="outlined-basic"
              label="DDD"
              placeholder="Digite o ddd do telefone"
              multiline
              fullWidth
            />

            <TextField
              id="outlined-basic"
              label="Numero"
              placeholder="Digite o numero do telefone"
              multiline
              fullWidth
            />
          </Box>
        </Box>

        <Box height="100%" display="flex" flexDirection="column" gap={1} margin={1}>
          <Typography variant="h5">Endereço</Typography>
          <Box display="flex" flexDirection={"row"} gap={1}>
            <TextField
              id="outlined-basic"
              label="CEP"
              placeholder="Digite a cep do seu endereço"
              multiline
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Cidade"
              placeholder="Digite a cidade do seu endereço"
              multiline
              fullWidth
            />
          </Box>
          <Box display="flex" flexDirection={"row"} gap={1}>
            <TextField
              id="outlined-basic"
              label="Rua"
              placeholder="Digite a rua do seu endereço"
              multiline
              fullWidth
            />

            <TextField
              id="outlined-basic"
              label="Estado"
              placeholder="Digite o estado do seu endereço"
              multiline
              fullWidth
            />

            <TextField
              id="outlined-basic"
              label="Numero"
              placeholder="Digite a numero do seu endereço"
              multiline
              fullWidth
            />
          </Box>
        </Box>
      </div>
    </Box>
  );
}
