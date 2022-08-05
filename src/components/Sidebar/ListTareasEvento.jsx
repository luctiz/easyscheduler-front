import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { List, ListItem, CircularProgress, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, Divider} from "@mui/material";

import { fireModalCrearEvento } from '../../events';
import { Add, Remove } from '@mui/icons-material';

import swal from 'sweetalert2';

export default function ListTareasEvento({username, equipo,equipoData, updateEquipos }) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Descripcion</TableCell>
            <TableCell align="right">Inicio&nbsp;(g)</TableCell>
            <TableCell align="right">Fin&nbsp;(g)</TableCell>
            <TableCell align="right">Asignado a</TableCell>
            <TableCell align="right">Peso&nbsp;(g)</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipoData ? equipoData.tareas.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.nombre}</TableCell>
              <TableCell align="right">{row.descripcion}</TableCell>
              <TableCell align="right">{row.horaInicio}</TableCell>
              <TableCell align="right">{row.horaFin}</TableCell>
              <TableCell align="right">{row.peso}</TableCell>
              <TableCell align="right">{row.estado}</TableCell>
            </TableRow>
          )) : <CircularProgress></CircularProgress>}
        </TableBody>
      </Table>
      {(equipoData.lider == username) ? 
            <ListItemButton onClick={() => fireModalCrearEvento(username, new Date().toISOString().substring(0,10), new Date().toISOString().substring(0,10), [equipo], updateEquipos)} key="agregar">
              <ListItemIcon>
              <Add />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
          </ListItemButton> 
          : ""}
    </TableContainer>
  );
}