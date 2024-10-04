import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { DarkTheme, LightTheme } from "../themes";
import { Box, ThemeProvider} from '@mui/material';

interface IThemeContextData{
    themeName: 'light' | 'dark'
    toggleTheme: () => void // altera o tema
}

const ThemeContext = createContext({} as IThemeContextData)

export function useAppThemeContext(){
    return useContext(ThemeContext)
}

export function AppThemeProvider({children}: {children: ReactNode}){
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light')
    
    const toggleTheme = useCallback(() =>{
        setThemeName(oldThemeName => oldThemeName === 'light'? 'dark' : 'light')
    }, [])

    const theme = useMemo(() => {
        return themeName === 'light' ? LightTheme : DarkTheme; 
    }, [themeName]);

    return(
        <ThemeContext.Provider value={{ themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height="100vh" bgcolor={theme.palette.background.default}>
                  {children}  
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}