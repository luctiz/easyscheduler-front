import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { List, ListItem, CircularProgress, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { fireModalCrearEvento } from '../../events';
import { Add, Remove } from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Group';
import GroupIcon from '@mui/icons-material/Group';
import swal from 'sweetalert2';
import ModalAgregarMiembroEquipo from './ModalAgregarMiembroEquipo';

export default function ListMiembrosEquipo({username, equipo,equipoData, updateEquipo}) {


    const handleBorrarMiembro = (miembro) => {
        let url = `${process.env.REACT_APP_BACKEND_URL}/equipo/removerMiembro/${equipo}&${equipoData.lider}`
        let data = 
          [miembro]
        ;
    
        let body = JSON.stringify(data)
    
        fetch(url, {
            method: 'PUT',
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
              }).then(() => updateEquipo())
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
    

  return (<>
    <ListItem disablePadding key="miembros">
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

            {(equipoData.lider == username) ? <ModalAgregarMiembroEquipo equipo={equipo} username={username} updateModalEquipo={updateEquipo}></ModalAgregarMiembroEquipo> : ""}
        </List>
        : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></div>}
        
        </>
  );
}