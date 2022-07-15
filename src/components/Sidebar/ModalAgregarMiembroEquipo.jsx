import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Group';
import { Add} from "@mui/icons-material";


import { List, ListItem, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, CircularProgress, Divider, TextField} from "@mui/material";
import swal from 'sweetalert2';


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


export default function ModalAgregarMiembroEquipo({username, equipo, updateModalEquipo}) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
        setOpen(true);}
  const handleClose = () => setOpen(false);


  const handleMiembroSubmit = async (e) =>{
    e.preventDefault()
    const form = new FormData(e.currentTarget);

    let url = `http://localhost:8080/equipo/agregarMiembro/${form.get("miembro")}`

    let data = {
        "lider": username,
        "nombre": equipo
    };

    let body = JSON.stringify(data)

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json; charset=utf-8"},
        body: body
    }).then((response) => {
        console.log(response)
        response.json().then(data => {
        console.log(data)
        if (response.ok){
            swal.fire({
                title: "Se agrego el miembro exitosamente",
                icon: "success"
            }).then(() => {setOpen(false), updateModalEquipo()});
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
        <Add />
        </ListItemIcon>
        <ListItemText primary="Agregar" />
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
            <form onSubmit={(e) => { handleMiembroSubmit(e)}}>
            <TextField id="outlined-basic" name="miembro" label="Nombre Miembro" variant="outlined" />

            <IconButton type="submit" color="primary" sx={{ p: '10px' }} aria-label="directions">
                <Add />
            </IconButton>
            </form>
        </Box>
        </Fade>
      </Modal>
    </div>
  );
}