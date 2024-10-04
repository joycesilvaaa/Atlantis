import { createTheme } from '@mui/material'
import { blue, grey, pink } from '@mui/material/colors'

function LightTheme(){
    return createTheme({
        palette: {
            primary:{
                main:pink[700],
                dark:pink[800],
                light:pink[500],
                contrastText:'white'
            },
            secondary:{
                main:pink[500],
                dark:pink[400],
                light:pink[300],
                contrastText:'white'
            },
            background: {
                default: grey[100],
                paper: 'white'
            }
        }
    })
}
export default LightTheme