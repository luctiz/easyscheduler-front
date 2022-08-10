import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { AutoAwesome, Difference} from "@mui/icons-material";
import swal from 'sweetalert2';
import Remove from '@mui/icons-material/Remove';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';

import { IconButton , Button, ListItemButton, ListItemIcon, ListItemText, Divider, Grid} from "@mui/material";
import ListTareasEvento from './ListTareasEvento';
import { fireModalDuplicarEvento } from '../../events';


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

export default function ModalEvento({username, equipo,equipoData, eventoData, updateEquipo}) {


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
        setOpen(true);}
  const handleClose = () => setOpen(false);
  
  const handleBorrarEvento = (nombreFecha) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/evento/${nombreFecha}&${username}`

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

  const handleRepartirEvento = (nombreFecha) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}/tarea/repartirTareas/${nombreFecha}`
    console.log(equipoData.miembros);

    let body = JSON.stringify(equipoData.miembros)    

    fetch(url, {method: 'PUT',
                headers: {
                          'Content-Type': "application/json"},
                body: body}
        ).then((response) => {
        console.log(response)
        if (response.ok){
          swal.fire({
              title: "Se repartió el evento equitativamente entre sus miembros",
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
          {equipoData.lider === username ?
          <><ListItemIcon title="Eliminar" onClick={()=> handleBorrarEvento(eventoData.nombreFecha)}>
            <IconButton color="error">
              <Remove/>
            </IconButton>
          </ListItemIcon> 

          <ListItemIcon title="Duplicar" onClick={()=> fireModalDuplicarEvento(username, eventoData.nombreFecha, new Date().toISOString().substring(0,10) ,updateEquipo)}>
          <IconButton color="primary">
            <Difference/>
          </IconButton>
        </ListItemIcon>
        </>: ""}

          
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
          <Divider/>
          <Typography variant="h6">
            Fecha: {eventoData.fecha} 
          </Typography>

           {equipoData.lider === username ? <Grid container spacing={2} style={{marginTop: "0px"}} columns={16}>
            <Grid item xs={8}>
                <Typography style={{margin:"5px", marginBottom:"2px"}} variant="h6">
                  Tareas
                </Typography>
            </Grid>
            <Grid item xs={8}>
              <Button color="primary"  onClick={()=> handleRepartirEvento(eventoData.nombreFecha)} variant="contained" endIcon={<AutoAwesome/>}>
                Repartir equitativamente
                </Button>
            </Grid>
          </Grid>: ""}
          
           <ListTareasEvento username={username} equipo={equipo} nombreFechaEvento={eventoData.nombreFecha} equipoData={equipoData} updateEquipo={updateEquipo}/>
        </Box>
        </Fade>
      </Modal>
    </div>
  );
}