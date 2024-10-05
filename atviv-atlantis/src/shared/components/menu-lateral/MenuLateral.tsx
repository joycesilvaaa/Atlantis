import { BorderColor, Delete, Description, ExpandLess, ExpandMore, Hotel, ListAlt, Pending, Person, StarBorder } from "@mui/icons-material";
import {
  Avatar,
  Collapse,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import { ReactNode, useState } from "react";

export function MenuLateral({ children }: { children: ReactNode }) {
  const [openClient, setOpenClient] = useState<boolean>(false);
  const [openHotel, setOpenHotel] = useState<boolean>(false);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))// informa quando o valor da tela ta menor

  function handleClickClient() {
    setOpenClient(!openClient);
  }

  function handleClickHotel() {
    setOpenHotel(!openHotel);
  }

  return (
    <>
      <Drawer open={true} variant={smDown? 'temporary': 'permanent'}>
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

              <Divider/>
              
              <ListItemButton onClick={handleClickClient}>
                <ListItemIcon>
                  <Icon>folder</Icon>
                </ListItemIcon>
                <ListItemText primary="Gerênciar Clientes" />
                {openClient ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openClient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      < Person/>
                    </ListItemIcon>
                    <ListItemText primary="Cadastro" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <BorderColor />
                    </ListItemIcon>
                    <ListItemText primary="Edição" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText primary="Ver Cliente" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Exclusão" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <ListAlt />
                    </ListItemIcon>
                    <ListItemText primary="Listagem" />
                  </ListItemButton>
                </List>
              </Collapse>

              <Divider/>

              <ListItemButton onClick={handleClickHotel}>
                <ListItemIcon>
                  <Icon>folder</Icon>
                </ListItemIcon>
                <ListItemText primary="Gerênciar Hospedagem" />
                {openHotel ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openHotel} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      < Hotel/>
                    </ListItemIcon>
                    <ListItemText primary="Cadastro" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <BorderColor />
                    </ListItemIcon>
                    <ListItemText primary="Edição" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText primary="Ver Hospedagem" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Delete />
                    </ListItemIcon>
                    <ListItemText primary="Exclusão" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <ListAlt />
                    </ListItemIcon>
                    <ListItemText primary="Listagem" />
                  </ListItemButton>
                </List>
              </Collapse>

              <Divider/>

            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={smDown? 0 :theme.spacing(32)}>
        {children}
      </Box>
    </>
  );
}
