import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState } from 'react';
import { ListItem, CircularProgress, IconButton , ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

import { fireModalAsignarTarea, fireModalCrearTarea } from '../../events';
import { Add, Remove } from '@mui/icons-material';

import swal from 'sweetalert2';

export default function ListTareasEvento({username, equipoData, nombreFechaEvento}) {
  
  const [eventoData,setEventoData] = useState();


  if (!eventoData){
    let url = `${process.env.REACT_APP_BACKEND_URL}/evento/${nombreFechaEvento}`
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        response.json().then(data => {
        if (response.ok){
            setEventoData(data)
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

  const handleBorrarTarea = (IDTAREA) => {
    let url = `${process.env.REACT_APP_BACKEND_URL}//tarea/borrarTarea/${IDTAREA}`


    fetch(url, {method: 'PUT'})
        .then((response) => {
        response.json().then(data => {
        console.log(data)
        if (response.ok){
          swal.fire({
              title: "Se borró la tarea exitosamente",
              icon: "success"
          }).then(() => setEventoData(null) /* updateEquipo() */)

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Descripcion</TableCell>
            <TableCell align="right">Inicio</TableCell>
            <TableCell align="right">Fin</TableCell>
            <TableCell align="right">Asignado a</TableCell>
            <TableCell align="right">Peso</TableCell>
            <TableCell align="right">Estado</TableCell>
            {equipoData.lider === username? <TableCell >Borrar</TableCell> : ""}
          </TableRow>
        </TableHead>
        <TableBody>
          {eventoData ? eventoData.tareas.map((row) => (
            <TableRow
              key={JSON.stringify(row._id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="right">{row.descripcion}</TableCell>
              <TableCell align="right">{row.horaInicio.substring(0,5)}</TableCell>
              <TableCell align="right">{row.horaFin.substring(0,5)}</TableCell>
              {equipoData.lider === username ?
                <TableCell >                     
                <ListItem style={{cursor: "pointer", border: "1px solid gray", borderRadius: "5px"}} onClick={()=> fireModalAsignarTarea(row.asignado, equipoData.miembros, eventoData.nombreFecha,row.nombre,() => setEventoData(null))}>
                  <ListItemText primary={row.asignado} />
                  </ListItem> 
                </TableCell>
                :<TableCell align="right">{row.asignado}</TableCell>
}
              <TableCell align="right">{row.peso}</TableCell>
              <TableCell align="right">{row.estado}</TableCell>
              {equipoData.lider === username ?
                <TableCell >                     
                <ListItemIcon onClick={()=> handleBorrarTarea(`${eventoData.nombreFecha}&${row.nombre}`)}>
                        <IconButton color="error">
                          <Remove/>
                        </IconButton>
                      </ListItemIcon> 
                </TableCell>: ""}
                      
                      
            </TableRow>
          )) : <CircularProgress/>}
        </TableBody>
      </Table>
      {(equipoData.lider === username) ?
            <ListItemButton onClick={() => fireModalCrearTarea(username, eventoData.nombreFecha, () => setEventoData(null))} key="agregar">
              <ListItemIcon>
              <Add />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
          </ListItemButton> 
          : ""}
    </TableContainer>
  );
}