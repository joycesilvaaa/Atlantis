import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

interface GraficoBarraData {
    month: string;
    total: number;
}

interface IGraficoBarraProps {
    title: string;
    data: GraficoBarraData[];
}

export function GraficoBarra({ data, title }: IGraficoBarraProps) {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));

    const formattedData = data.map(item => ({
        month: item.month,
        quant: item.total, 
    }));

    return (
        <Box padding={smDown ? 0 : 4} margin={smDown ? 0 : 2} display="flex" flexDirection="column" alignItems="center">
            <Typography variant='h5' gutterBottom textAlign="center" width="100%">
                {title}
            </Typography>
            <BarChart
                dataset={formattedData} 
                xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'quant', label: 'Quantidade no Mês' }]} 
                height={smDown ? 200 : 400}
                colors={['#ff6384']}
            />
        </Box>
    );
}
