
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Box, useTheme, useMediaQuery, Divider } from "@mui/material";
import { GraficoBarra, GraficoPizza } from '../../shared/components';


export function Dashboard() {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    const data = [
        { month: 'Jan', total: 50 },
        { month: 'Feb', total: 55 },
        { month: 'Mar', total: 60 },
        { month: 'Apr', total: 70 },
        { month: 'May', total: 95 },
        { month: 'Jun', total: 95 },
        { month: 'Jul', total: 115 },
        { month: 'Aug', total: 115 },
        { month: 'Sep', total: 100 },
        { month: 'Oct', total: 85 },
        { month: 'Nov', total: 65 },
        { month: 'Dec', total: 55 },
    ];

    const clientData = [
        { id: 0, value: 8, label: 'Titular' },
        { id: 1, value: 15, label: 'Dependente' },
    ];

    const acomodacaoData = [
        { id: 0, value: 8, label: 'Casal Simples' },
        { id: 1, value: 15, label: 'Familia Mais' },
        { id: 2, value: 10, label: 'Familia Simples' },
        { id: 3, value: 10, label: 'Familia Super' },
        { id: 4, value: 5, label: 'Solteiro Mais' },
        { id: 5, value: 9, label: 'Solteiro Simples' },
    ]
    
    return (
        <LayoutBaseDePagina title="Dashboard">
            <Divider/>
            <Box 
                display="flex" 
                flexDirection={smDown ? 'column' : 'row'}
                justifyContent="space-around" 
                alignItems={smDown ? 'center' : 'flex-start'} 
                padding={smDown ? 0 : 2}
            >
                
               <GraficoPizza data={clientData} title='Novos Clientes no Mês' />
               <GraficoPizza data={acomodacaoData}  title='Reservas por Acomodação'/>
            
            </Box>

            <GraficoBarra data={data} title='Total de Hospedagens '/>
        </LayoutBaseDePagina>
    );
}
