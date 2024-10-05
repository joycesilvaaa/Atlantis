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
            padding={smDown ? 0 : 2}
            margin={smDown ? 0 : 2}
        >
            <Typography
                variant="h5"
                textAlign="center"
                width="100%"
                marginBottom={1}
            >
                {title}
            </Typography>
            <PieChart
                series={[{ data }]}
                width={smDown ? 200 : 500}
                height={smDown ? 200 : 200}
                slotProps={{
                    legend: {
                        hidden: smDown
                    },
                }}
            />
        </Box>
    );
}
