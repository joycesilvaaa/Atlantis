import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IDrawerContextData{
    isDrawerOpen: boolean
    toggleDrawerOpen: () => void // altera o tema
}

const DrawerContext = createContext({} as IDrawerContextData)

export function useDrawerContext(){
    return useContext(DrawerContext)
}

export function DrawerProvider({children}: {children: ReactNode}){
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
    
    const toggleDrawerOpen = useCallback(() =>{
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen )
    }, [])


    return(
        <DrawerContext.Provider value={{ isDrawerOpen: isDrawerOpen, toggleDrawerOpen: toggleDrawerOpen}}>
           {children}  
        </DrawerContext.Provider>
    )
}