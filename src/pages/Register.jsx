
import React from 'react';
import swal from 'sweetalert2';

import {Container, Stack, TextField, Button, Typography} from '@mui/material';
import AppHeaderBig from '../components/AppHeaderBig';

export default function Register() {

    const handleSubmit =  async (e) => {

        e.preventDefault()
        const form = new FormData(e.currentTarget);
  
        let url = `${process.env.REACT_APP_BACKEND_URL}/usuario/${form.get("username")}&${form.get("password")}`
        
        if (form.get("password") !== form.get("confirmPassword")){
          await swal.fire({
            title: "Ocurrió un error: ",
            text: "Las contraseñas no coinciden",
            icon: "error"});
        } else {
          fetch(url, {
            method: 'POST',
             headers: {
               'Content-Type': "application/json; charset=utf-8"},
            //body: data,
          })
          .then((response) => {
            response.json().then((data) => {
            if (response.ok){
              swal.fire({
                title: "Tu usuario se creó exitosamente", // redireccionar a pantalla principal?
                icon: "success"}).then(function() {
                  window.location.href = "/login";
                })
            } else {
              swal.fire({
                title: "Ocurrió un error: ",
                text: data.message,
                icon: "error"});
            }})
          })

          .catch((error) => {console.log(error); swal.fire({
            title: "Ocurrió un error: ",
            text: error.message,
            icon: "error"});});
            
        }
      }

      return (
        <>

            <AppHeaderBig/>
            
            <Container style={{paddingTop: "20px", maxWidth: "800px"}}>
            <Typography variant="h4" component="h4" style={{textAlign: "center", color: "#6F7E8C"}}> 
                Registro
            </Typography>

              {/* Search form */}
  
              <form onSubmit={(e) => { handleSubmit(e)}}  className="border-b border-slate-200">

              <Stack spacing={2} style={{display:"flex", justifyContent:"center"}}>
                <TextField id="username" name="username" label="Usuario" variant="outlined" />
                <TextField id="password" name="password" type="password" label="Contraseña" variant="outlined" />
                <TextField id="confirmpassword" name="confirmPassword" type="password" label="Confirmar Contraseña" variant="outlined" />
                    
                <Button variant="contained" type="submit">Crear usuario</Button>

              </Stack>
  
              </form>
            </Container>
        </>
      );
}
