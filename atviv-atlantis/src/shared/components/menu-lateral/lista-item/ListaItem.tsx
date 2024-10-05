import { ReactNode } from "react";
import { 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse, 
  Icon, 
  List 
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface MenuItem {
  text: string;
  icon: ReactNode;
  action: () => void;
}

interface IListItemProps {
  isOpen: boolean;
  items: MenuItem[];
  title: string;
  handleClick: () => void;
}

export function ListaItem({ handleClick, isOpen, items, title }: IListItemProps) {
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Icon>folder</Icon>
        </ListItemIcon>
        <ListItemText primary={title} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }} onClick={item.action}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
