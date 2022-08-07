import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Group';
import { Add, Update} from "@mui/icons-material";
import swal from 'sweetalert2';
import Remove from '@mui/icons-material/Remove';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';

import { List, ListItem, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, CircularProgress, Divider} from "@mui/material";
import ModalAgregarMiembroEquipo from './ModalAgregarMiembroEquipo';
import ListEventosEquipo from './ListEventosEquipo';
import ListTareasEvento from './ListTareasEvento';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalEvento({username, equipo,equipoData, eventoData, updateEquipo}) {


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
        setOpen(true);}
  const handleClose = () => setOpen(false);
  
  const handleBorrarEvento = (nombreFecha) => {
    let url = `http://localhost:8080/evento/${nombreFecha}&${username}`

    fetch(url, {method: 'DELETE'}
        ).then((response) => {
        console.log(response)
        if (response.ok){
          swal.fire({
              title: "Se borró el evento exitosamente",
              icon: "success"
          }).then(() => updateEquipo())
        } else {
        response.json().then(data => {
        swal.fire({
            title: "Ocurrió un error: ",
            text: data.message,
            icon: "error"});
        })}
    }).catch((error) => {console.log(error); swal.fire({
        title: "Ocurrió un error: ",
        text: error.message,
        icon: "error"});});       
  }

  return (
    <div>
      <ListItemButton onClick={handleOpen}>
          <ListItemIcon>
          <WhereToVoteIcon/>
          </ListItemIcon>
          <ListItemText primary={eventoData.nombre} />
          <ListItemText primary={eventoData.fecha}/> 
          {equipoData.lider == username ? 
          <ListItemIcon onClick={()=> handleBorrarEvento(eventoData.nombreFecha)}>
            <IconButton color="error">
              <Remove/>
            </IconButton>
          </ListItemIcon> : ""}
      </ListItemButton>
     <Modal key="myModal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <Typography color="primary" variant="h5">
            {eventoData.nombre}
          </Typography>
          <Divider></Divider>
          <Typography variant="h6">
            Fecha: {eventoData.fecha} 
          </Typography>


          <Typography style={{margin:"5px", marginBottom:"2px"}} variant="h6">
            Tareas
          </Typography>
           <ListTareasEvento username={username} equipo={equipo} nombreFechaEvento={eventoData.nombreFecha}equipoData={equipoData} updateEquipo={updateEquipo}></ListTareasEvento>
        </Box>
        </Fade>
      </Modal>
    </div>
  );
}