import { Routes, Route, Navigate } from "react-router-dom"
import { Dashboard } from "../pages/dashboard/Dashboard"
import { CadastroCliente } from "../pages"

function AppRoutes(){
    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>}/>
            <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
            <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
        </Routes>
    )
}
export default AppRoutes