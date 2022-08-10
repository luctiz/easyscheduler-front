import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import { Add} from "@mui/icons-material";


import { ListItemButton, ListItemIcon, ListItemText, TextField, Button} from "@mui/material";
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


export default function ModalCrearEquipo({username, updateListEquipos}) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
        setOpen(true);}
  const handleClose = () => setOpen(false);


  const handleMiembroSubmit = async (e) =>{
    e.preventDefault()
    const form = new FormData(e.currentTarget);
    const nombreEquipo = form.get("nombreEquipo");

    let url = `${process.env.REACT_APP_BACKEND_URL}/equipo/${nombreEquipo}&${username}`;

    let data = [];

    let body = JSON.stringify(data)

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': "application/json; charset=utf-8"},
        body: body
    }).then((response) => {
        console.log(response)
        response.json().then(data => {
        console.log(data)
        if (response.ok){
            swal.fire({
                title: `Se creo el equipo ${nombreEquipo} exitosamente`,
                icon: "success"
            }).then(() => {setOpen(false), updateListEquipos()});
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
    <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
        <Add />
        </ListItemIcon>
        <ListItemText primary="Nuevo" />
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
            <TextField id="outlined-basic" name="nombreEquipo" label="Nombre Equipo" variant="outlined" />

            <Button type="submit" color="primary" sx={{ p: '10px' }} aria-label="directions">
                Crear
            </Button>
            </form>
        </Box>
        </Fade>
      </Modal>
    </div>
  );
}