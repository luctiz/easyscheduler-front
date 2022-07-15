
import React, { useState, useRef, useEffect } from 'react';
import swal from 'sweetalert2';

import {Container, Stack, TextField, Button, Typography} from '@mui/material';
import AppHeaderBig from '../components/AppHeaderBig';
import { NavLink } from 'react-router-dom';
import ESCalendar from '../components/ESCalendar';
import Sidebar from '../components/Sidebar';


export default function Dashboard() {
    let myUsername;
    if (!window.localStorage.getItem("isLoggedIn") || !window.localStorage.getItem("username")){
        window.location.href = "/";
        return;
    } else {
        myUsername = window.localStorage.getItem("username")
    }

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
        <div style={{display: "flex", width: "100%"}}>

        <div style={{flexDirection: "column", flex: "none", width: "256px", overflow: "hidden", position: "relative"}} ><Sidebar username={myUsername}></Sidebar></div>
            

        <div style={{flex: "1 1 auto", overflow: "hidden", position: "relative"}}><ESCalendar></ESCalendar></div>    
           

        </div>
      );
}
