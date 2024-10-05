import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

interface GraficoPizzaData {
    id: number;
    value: number;
    label: string;
}

interface IGraficoPizzaProps {
    title: string;
    data: GraficoPizzaData[];
}

export function GraficoPizza({ data, title }: IGraficoPizzaProps) {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Typography
                variant="h5"
                textAlign="center"
                width="100%"
                marginBottom={1}
            >
                {title}
            </Typography>
            <Box width={theme.spacing(60)} height={theme.spacing(25)}>
                 <PieChart
                series={[{ data }]}
                slotProps={{
                    legend: {
                        hidden: smDown
                    },
                }}
            />
            </Box>
        </Box>
    );
}
