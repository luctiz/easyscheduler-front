import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { List, ListItem, CircularProgress, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { fireModalCrearEvento } from '../../events';
import { Add } from '@mui/icons-material';

export default function ListEventosEquipo({username, equipo,equipoData, updateEquipos}) {
    const [eventosEquipo, setEventosEquipo] = useState(null);

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


  // return (
  //   eventosEquipo ? 
  //   (eventosEquipo.length != 0 ? <TableContainer component={Paper}>
  //     <Table /* sx={{ minWidth: 650 }}  */aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Nombre</TableCell>
  //           <TableCell align="right">Fecha</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {eventosEquipo.map((row) => (
  //           <TableRow
  //             key={row.nombre}
  //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  //           >
  //             <TableCell component="th" scope="row">
  //               {row.nombre}
  //             </TableCell>
  //             {/* <TableCell align="right">{row.nombre}</TableCell> */}
  //             <TableCell align="right">{row.fecha}</TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  //   : <span style={{marginLeft: "20px"}}>Aún no hay eventos para este equipo</span>)
  //   : <CircularProgress/>
  // );
  console.log("EQUIPODATA")
  console.log(equipoData)

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
                  </ListItemButton>)
          : <span style={{marginLeft: "20px"}}>Aún no hay eventos para este equipo</span>,
          
          (equipoData.lider == username) ? 
            <ListItemButton onClick={() => fireModalCrearEvento(username, new Date().toISOString().substring(0,10), new Date().toISOString().substring(0,10), [equipo],() => setEventosEquipo(null))} key="agregar">
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