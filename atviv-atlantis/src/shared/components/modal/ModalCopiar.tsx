import { Box, Button, Modal, Typography } from "@mui/material";
import { IDocumento } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface ModalCopiarProps{
    documento: IDocumento;
    open: boolean;
    handleClose: () => void;
}

export function ModalCopiar({ documento, open, handleClose }: ModalCopiarProps){
    const navigate = useNavigate()

      function handleCopiar(){
        navigator.clipboard.writeText(documento.numero)
        navigate("/ver-cliente")
        handleClose()
      }

    return(
        <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box p={4} bgcolor="white">
          <Typography id="modal-title" variant="h6" component="h2">
          Copie o documento e use na busca
        </Typography>
          <Typography id="modal-title"  >
          {documento ? `${documento.tipo}: ${documento.numero}` : "Nenhum documento selecionado."}
        </Typography>
            <Button variant="outlined" color="secondary" onClick={handleCopiar}>
              Copiar
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Fechar
            </Button>
          </Box>
        </Modal>
      </Box>
    )
}