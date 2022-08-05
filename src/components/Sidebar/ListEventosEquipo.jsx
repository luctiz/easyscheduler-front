import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { List, ListItem, CircularProgress, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { fireModalCrearEvento } from '../../events';
import { Add, Remove } from '@mui/icons-material';

import swal from 'sweetalert2';

export default function ListEventosEquipo({username, equipo,equipoData, updateEquipos}) {

    const [eventosEquipo, setEventosEquipo] = useState(null);

    const updateModal = () => {setEventosEquipo(null)}

    if (!eventosEquipo){
        let url = `http://localhost:8080/evento/equipo//${equipo}`
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            console.log(response)
            response.json().then(data => {
            if (response.ok){
                setEventosEquipo(data)
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


    const handleBorrarEvento = (nombreFecha) => {
        let url = `http://localhost:8080/evento/${nombreFecha}&${username}`
    
        fetch(url, {method: 'DELETE'}
            ).then((response) => {
            console.log(response)
            if (response.ok){
              swal.fire({
                  title: "Se borró el evento exitosamente",
                  icon: "success"
              }).then(() => updateModal())
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
    

  return (<>
    <ListItem disablePadding key="eventos">
            <ListItemButton >
            <ListItemIcon>
                <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Eventos" />
            </ListItemButton>
        </ListItem> 

    {(eventosEquipo && equipoData) ? 
    <List sx={{ ml: 2, pl: 2 }} component="div" disablePadding>
      { [(eventosEquipo.length != 0) ? 
                  eventosEquipo.map((evento) => 
                  <ListItemButton key={evento.nombreFecha}>
                      <ListItemIcon>
                      <WhereToVoteIcon/>
                      </ListItemIcon>
                      <ListItemText primary={evento.nombre} />
                      <ListItemText primary={evento.fecha}/> 
                      {equipoData.lider == username ? 
                      <ListItemIcon onClick={()=> handleBorrarEvento(evento.nombreFecha)}>
                        <IconButton color="error">
                          <Remove/>
                        </IconButton>
                      </ListItemIcon> : ""}
                  </ListItemButton>)
          : <span style={{marginLeft: "20px"}}>Aún no hay eventos para este equipo</span>,
          
          (equipoData.lider == username) ? 
            <ListItemButton onClick={() => fireModalCrearEvento(username, new Date().toISOString().substring(0,10), new Date().toISOString().substring(0,10), [equipo], updateModal)} key="agregar">
              <ListItemIcon>
              <Add />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
          </ListItemButton> 
          : ""]
          }
        
        </List> : <CircularProgress />}
        
        </>
  );
}