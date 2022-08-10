import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';

import swal from 'sweetalert2';

import { ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";
import ListEventosEquipo from './ListEventosEquipo';
import ListMiembrosEquipo from './ListMiembrosEquipo';
import { hashStringToColor } from '../../utils';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
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
    let url = `${process.env.REACT_APP_BACKEND_URL}/equipo/miembros/${equipo}`
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        response.json().then(data => {
        if (response.ok){
            setEquipoData({"lider": data[0].equipos.filter((e) => e.nombre === equipo)[0].lider,
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
        <GroupIcon style={{color: "white", padding: "2px", borderRadius: "5px", backgroundColor: `${hashStringToColor(equipo)}`}}/>
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

          <ListMiembrosEquipo username={username} equipo={equipo} equipoData={equipoData} updateEquipo={updateModal} />
          <Divider/>
          <ListEventosEquipo username={username} equipo={equipo} equipoData={equipoData} updateEquipo={updateModal}/>
        </Box>
        </Fade> 
      </Modal>
    </div>
  );
}