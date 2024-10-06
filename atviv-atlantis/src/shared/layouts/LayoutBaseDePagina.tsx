import { MenuSharp } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaPros {
  title: string;
  children: ReactNode;
}
export function LayoutBaseDePagina({children,title,}: ILayoutBaseDePaginaPros) {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm")); // informa quando o valor da tela ta menor
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box display="flex">
        {smDown && (
          <MenuSharp onClick={toggleDrawerOpen} sx={{ fontSize: "3rem" }} />
        )}
      </Box>

      <Box
        padding={1}
        display="flex"
        alignItems="center"
        margin={3}
        height={theme.spacing(smDown? 6: mdDown? 3: 5)}
      >
        <Typography 
            variant='h3' 
            whiteSpace="nowrap" 
            overflow="hidden" 
            textOverflow="ellipsis"
        >
          {title}
        </Typography>
      </Box>
      <Box flex={1} overflow="auto">
        <Divider/>
        {children}
        </Box>
    </Box>
  );
}