import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { title } from "process"
import { ReactNode } from "react"

interface IListaItemSimplesProps{
    title: string
    icon: ReactNode
    handleClick: ()=> void
}

export function ListaItemSimples({ title, icon, handleClick }: IListaItemSimplesProps){
    return(
       <>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                <ListItemIcon>{icon}</ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={title}/>
              </ListItemButton>
              </>
    ) 
}