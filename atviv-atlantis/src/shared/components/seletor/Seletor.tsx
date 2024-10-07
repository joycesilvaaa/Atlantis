import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface Options{
    value: number|string
    label: string
}

interface SeletorProps{
    title: string
    value: number | string
    options: Options[]
    handleChangeValue: (event: SelectChangeEvent<number | string>) => void;
}

export function Seletor({ title, value, options, handleChangeValue }: SeletorProps){
    return (
        <FormControl fullWidth >
            <InputLabel id={`${title}-simple-select-label`}>
              {title}
            </InputLabel>
            <Select
              labelId={`${title}-simple-select-label`}
              id={`${title}-simple-select-label`}
              label={`${title}`}
              value={value}
              onChange={handleChangeValue}
            >
              <MenuItem value="">
                <em>Selecione uma opção</em>
              </MenuItem>
              {options.map((option) =>(
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
    )
}