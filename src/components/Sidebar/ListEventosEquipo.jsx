import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

export default function ListEventosEquipo({equipo}) {
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


  return (
    eventosEquipo ? 
    (eventosEquipo.length != 0 ? <TableContainer component={Paper}>
      <Table /* sx={{ minWidth: 650 }}  */aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventosEquipo.map((row) => (
            <TableRow
              key={row.nombre}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
              {/* <TableCell align="right">{row.nombre}</TableCell> */}
              <TableCell align="right">{row.fecha}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    : <span style={{marginLeft: "20px"}}>Aún no hay eventos para este equipo</span>)
    : <CircularProgress/>
  );
}