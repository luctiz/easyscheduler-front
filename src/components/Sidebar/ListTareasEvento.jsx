import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState } from 'react';
import { List, ListItem, CircularProgress, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";

import { fireModalCrearEvento, fireModalCrearTarea } from '../../events';
import { Add, Remove } from '@mui/icons-material';

import swal from 'sweetalert2';

export default function ListTareasEvento({username, equipo,equipoData, eventoData, updateEquipo }) {

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
          </TableRow>
        </TableHead>
        <TableBody>
          {eventoData ? eventoData.tareas.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="right">{row.descripcion}</TableCell>
              <TableCell align="right">{row.horaInicio}</TableCell>
              <TableCell align="right">{row.horaFin}</TableCell>
              <TableCell align="right">{row.asignado}</TableCell>
              <TableCell align="right">{row.peso}</TableCell>
              <TableCell align="right">{row.estado}</TableCell>
            </TableRow>
          )) : <CircularProgress></CircularProgress>}
        </TableBody>
      </Table>
      {(equipoData.lider == username) ? 
            <ListItemButton onClick={() => fireModalCrearTarea(username, eventoData.nombreFecha, updateEquipo)} key="agregar">
              <ListItemIcon>
              <Add />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
          </ListItemButton> 
          : ""}
    </TableContainer>
  );
}