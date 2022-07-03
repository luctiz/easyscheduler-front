
import React, { useState, useRef, useEffect } from 'react';
import swal from 'sweetalert2';

import {Container, Stack, TextField, Button, Typography} from '@mui/material';
import AppHeaderBig from '../components/AppHeaderBig';
import { NavLink } from 'react-router-dom';

export default function Login() {

    const handleSubmit =  async (e) => {

        e.preventDefault()
        const form = new FormData(e.currentTarget);
  
        let url = "xxxxx"
        let data = JSON.stringify({
            "username": form.get("username"), 
            "password": form.get("password")})
  
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': "application/json; charset=utf-8"},
          body: data,
        })
        .then((response) => {
          if (response.ok){
            swal.fire({
              title: "Login exitoso", //directamente redireccionar
              icon: "success"});
            updateDashboard();
          } else {
            console.log(response)
            swal.fire({
              title: "Ocurrió un error: ",
              text: response.statusText,
              icon: "error"});
          }})
        .catch((error) => {console.log(error); swal.fire({
          title: "Ocurrió un error: ",
          text: error.message,
          icon: "error"});});
        
        //setModalOpen(false);
          
      }

      return (
        <>

            <AppHeaderBig></AppHeaderBig>
            
            <Container style={{paddingTop: "20px", maxWidth: "800px"}}>
            <Typography variant="h4" component="h4" style={{textAlign: "center", color: "#6F7E8C"}}> 
                Iniciar Sesión
            </Typography>

              {/* Search form */}
  
              <form onSubmit={(e) => { handleSubmit(e)}}  className="border-b border-slate-200">

              <Stack spacing={2} style={{display:"flex", justifyContent:"center", textAlign: "center"}}>
              <TextField id="username" name="username" label="Usuario" variant="outlined" />
              <TextField id="password" name="password" type="password" label="Contraseña" variant="outlined" />
                  
                    {/* <Button variant="text" onClick={() => setModalOpen(false)}>Cancelar</Button> */}
                    <Button variant="contained" type="submit">Ingresar</Button>

                    <NavLink end to="/register" className="block">¿No tenés una cuenta? Registrate</NavLink>

                </Stack>
  
              </form>
            </Container>

        </>
      );
}
