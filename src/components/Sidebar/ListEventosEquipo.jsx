import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { List, ListItem, CircularProgress, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { fireModalCrearEvento } from '../../events';
import { Add, Remove } from '@mui/icons-material';

import swal from 'sweetalert2';
import ModalEvento from './ModalEvento';

export default function ListEventosEquipo({username, equipo,equipoData, updateEquipo}) {

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

    
  return (<>
    <ListItem disablePadding>
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
                  eventosEquipo.map((eventoData) => 
                  <ModalEvento key={eventoData.nombreFecha} 
                    username={username} equipo={equipo} equipoData={equipoData} eventoData={eventoData} updateEquipo={updateModal}></ModalEvento>
                  )
          : <span style={{marginLeft: "20px"}}>Aún no hay eventos para este equipo</span>,
          
          (equipoData.lider == username) ? 
            <ListItem >
                <ListItemButton
                        onClick={() => fireModalCrearEvento(username, new Date().toISOString().substring(0,10), new Date().toISOString().substring(0,10), [equipo], updateModal)} >
                <ListItemIcon>
                <Add />
                </ListItemIcon>
                <ListItemText primary="Agregar Nuevo" />
            </ListItemButton> 
            </ListItem>
          : ""]
          }
        
        </List> : <CircularProgress />}
        
        </>
  );
}