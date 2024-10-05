import {
  BorderColor,
  Delete,
  Description,
  Hotel,
  ListAlt,
  Person,
} from "@mui/icons-material";
import { Divider, Drawer, List, ListItem, useTheme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { ReactNode, useState } from "react";
import { useDrawerContext } from "../../contexts";
import { ListaItem } from "./lista-item/ListaItem";
import { useNavigate } from "react-router-dom";

export function MenuLateral({ children }: { children: ReactNode }) {
  const [openClient, setOpenClient] = useState<boolean>(false);
  const [openHotel, setOpenHotel] = useState<boolean>(false);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm")); // informa quando o valor da tela ta menor
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const navigate = useNavigate()

  const clientMenuItems = [
    {
      text: "Cadastro",
      icon: <Person />,
      action: () => {
        navigate('');
        toggleDrawerOpen(); 
      }
    },
    {
      text: "Edição",
      icon: <BorderColor />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
    {
      text: "Ver Cliente",
      icon: <Description />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
    {
      text: "Exclusão",
      icon: <Delete />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
    {
      text: "Listagem",
      icon: <ListAlt />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
  ];

  const hotelMenuItems = [
    {
      text: "Cadastro",
      icon: <Hotel />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
    {
      text: "Edição",
      icon: <BorderColor />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
    {
      text: "Ver Hospedagem",
      icon: <Description />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
    {
      text: "Exclusão",
      icon: <Delete />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
    {
      text: "Listagem",
      icon: <ListAlt />,
      action: () => {
      navigate('');
      toggleDrawerOpen();
    }
    },
  ];

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(32)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              component="img"
              sx={{ height: 12 * 8, width: 12 * 8 }}
              src="./Atlantis.png"
              alt="Imagem"
            ></Box>
          </Box>

          <Box flex={1}>
            <List component="nav">
              <Divider />
              <ListaItem
                title="Gerênciar Clientes"
                isOpen={openClient}
                items={clientMenuItems}
                handleClick={() => setOpenClient(!openClient)}
              />
              <Divider />

              <ListaItem
                title="Gerênciar Hospedagem"
                isOpen={openHotel}
                items={hotelMenuItems}
                handleClick={() => setOpenHotel(!openHotel)}
              />
              <Divider />
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        height="100vh"
        marginLeft={smDown ? theme.spacing(1) : theme.spacing(32)}
      >
        {children}
      </Box>
    </>
  );
}
