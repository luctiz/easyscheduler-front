import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';

import { Add, Update} from "@mui/icons-material";
import swal from 'sweetalert2';

import { List, ListItem, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, CircularProgress, Divider} from "@mui/material";
import ListEventosEquipo from './ListEventosEquipo';
import ListMiembrosEquipo from './ListMiembrosEquipo';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalEquipo({username, equipo,updateTareas}) {

  const [equipoData, setEquipoData] = useState(null)

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
        setEquipoData(null);
        setOpen(true);}
  const handleClose = () => {setOpen(false),
                            updateTareas()};
  const updateModal = () => setEquipoData(null)

  if (!equipoData){
    let url = `http://localhost:8080/equipo/miembros/${equipo}`
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        response.json().then(data => {
        if (response.ok){
            setEquipoData({"lider": data[0].equipos.filter((e) => e.nombre == equipo)[0].lider,
                         "miembros": data.map((usuario) => usuario.nombreUsuario)})
        } else {
        swal.fire({
            title: "Ocurrió un error: ",
            text: data.message,
            icon: "error"});
        }
    })}).catch((error) => {console.log(error); swal.fire({
        title: "Ocurrió un error: ",
        text: error.message,
        icon: "error"});});       
  }
  
  

  return (
    <div>
    <ListItemButton onClick={handleOpen} key={equipo}>
        <ListItemIcon>
        <GroupIcon></GroupIcon>
        </ListItemIcon>
        <ListItemText primary={equipo} />
    </ListItemButton>
     <Modal
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
          <span className="css-10hburv-MuiTypography-root">{equipo}</span>

          <ListMiembrosEquipo username={username} equipo={equipo} equipoData={equipoData} updateEquipo={updateModal} ></ListMiembrosEquipo>
          <Divider></Divider>
          <ListEventosEquipo username={username} equipo={equipo} equipoData={equipoData} updateEquipo={updateModal}></ListEventosEquipo>
        </Box>
        </Fade> 
      </Modal>
    </div>
  );
}