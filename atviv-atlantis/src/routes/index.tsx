import { Routes, Route, Navigate } from "react-router-dom"
import { CadastroHospedagem, Dashboard, EditarCliente, ExcluirCliente, ListagemCliente, VerCliente } from "../pages"
import { CadastroCliente } from "../pages"

function AppRoutes(){
    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>}/>
            <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
            <Route path="/editar-cliente" element={<EditarCliente/>}/>
            <Route path="/ver-cliente" element={<VerCliente/>}/>
            <Route path="/excluir-cliente" element={<ExcluirCliente/>}/>
            <Route path="/listagem-clientes" element={<ListagemCliente/>}/>
            <Route path="/cadastro-hospedagem" element={<CadastroHospedagem/>}/>
            <Route path="*" element={<Navigate to="/pagina-inicial"/>}/>
        </Routes>
    )
}
export default AppRoutes
