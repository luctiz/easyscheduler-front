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

import { List, ListItem, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, CircularProgress, Divider} from "@mui/material";
import ModalAgregarMiembroEquipo from './ModalAgregarMiembroEquipo';


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

export default function ModalEquipo({username, equipo}) {

  const [equipoData, setEquipoData] = useState(null)
  const [eventosData, setEventosData] = useState(null)

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
        setEquipoData(null);
        setOpen(true);}
  const handleClose = () => setOpen(false);
  const updateModal = () => setEquipoData(null)

  if (!equipoData){
    let url = `http://localhost:8080/equipo/miembros/${equipo}`
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        console.log(response)
        response.json().then(data => {
        console.log(data)
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
  
  const handleBorrarMiembro = (miembro) => {
    let url = `http://localhost:8080/equipo/removerMiembro/${equipo}&${equipoData.lider}`
    let data = 
      [miembro]
    ;

    let body = JSON.stringify(data)

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json; charset=utf-8"},
        body: body}
        ).then((response) => {
        console.log(response)
        response.json().then(data => {
        console.log(data)
        if (response.ok){
          swal.fire({
              title: "Se borró el miembro exitosamente",
              icon: "success"
          }).then(() => updateModal())
          //setEquipoData({"lider": data[0].equipos.filter((e) => e.nombre == equipo)[0].lider,
          //             "miembros": data.map((usuario) => usuario.nombreUsuario)})
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
          <List>

        <ListItem disablePadding>
            <ListItemButton >
            <ListItemIcon>
                <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Miembros" />
            </ListItemButton>
        </ListItem> 

        {equipoData ? 
        <List sx={{ ml: 2, pl: 2 }} component="div" disablePadding>
                {equipoData.miembros.map((miembro) => 
                <ListItemButton key={miembro}>
                    <ListItemIcon>
                    <GroupIcon></GroupIcon>
                    </ListItemIcon>
                    <ListItemText primary={miembro} />
                    {(equipoData.lider == miembro) 
                    ? <ListItemText primary="Lider"/> 
                    : (equipoData.lider == username ? 
                      <ListItemIcon onClick={()=> handleBorrarMiembro(miembro)}>
                        <IconButton color="error">
                          <Remove/>
                        </IconButton>
                      </ListItemIcon> : "")}
                </ListItemButton>)}

            {(equipoData.lider == username) ? <ModalAgregarMiembroEquipo equipo={equipo} username={username} updateModalEquipo={updateModal}></ModalAgregarMiembroEquipo> : ""}
            {/* <ListItemButton  onClick={(e) => {e.stopPropagation()}}>
                <ListItemIcon>
                <Add />
                </ListItemIcon>
                <ListItemText primary="Agregar" />
            </ListItemButton> */}
        </List>
        : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></div>}

        <Divider></Divider>
        <ListItem disablePadding>
            <ListItemButton >
            <ListItemIcon>
                <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Eventos" />
            </ListItemButton>
        </ListItem> 

        {eventosData ? <></>
        // <List sx={{ ml: 2, pl: 2 }} component="div" disablePadding>
        //         {equipoData.miembros.map((miembro) => 
        //         <ListItemButton key={miembro}>
        //             <ListItemIcon>
        //             <GroupIcon></GroupIcon>
        //             </ListItemIcon>
        //             <ListItemText primary={miembro} />
        //             {(equipoData.lider == miembro) ? <ListItemText primary="Lider"/> : ""}
        //         </ListItemButton>)}

        //     <ListItemButton  onClick={(e) => {e.stopPropagation()}}>
        //         <ListItemIcon>
        //         <Add />
        //         </ListItemIcon>
        //         <ListItemText primary="Agregar" />
        //     </ListItemButton>
        // </List>
        : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></div>}
        </List>
        </Box>
        </Fade>
      </Modal>
    </div>
  );
}