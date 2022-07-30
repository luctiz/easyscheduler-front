
import React, { useState, useRef, useEffect } from 'react';
import swal from 'sweetalert2';

import {Container, Stack, TextField, Button, Typography} from '@mui/material';
import AppHeaderBig from '../components/AppHeaderBig';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TuiCalendar from '../TuiCalendar';

const start = new Date();
const schedules = [
  {
    calendarId: "1",
    category: "time",
    isVisible: true,
    title: "Study",
    id: "1",
    body: "Test",
    start,
    end: new Date(new Date().setMinutes(start.getMinutes() + 30))
  },
  {
    calendarId: "2",
    category: "time",
    isVisible: true,
    title: "Meeting",
    id: "2",
    body: "Description",
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2))
  },
  {
    calendarId: "3",
    category: "time",
    isVisible: true,
    title: "Nombre Tarea",
    id: "2",
    body: "Nombre Evento",
    start: new Date(new Date().setHours(start.getHours() -4)),
    end: new Date(new Date().setHours(start.getHours() - 2))
  }
];



var calendars = [
  {
    id: "1",
    name: "My Calendar",
    color: "#ffffff",
  },
  {
    id: "2",
    name: "Company",
    color: "#ffffff",
  },
  {
    id: "3",
    name: "Nombre Equipo",
    color: "#ffffff",
  }
];

function djb2(str){
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash;
}

function hashStringToColor(str) {
  var hash = djb2(str);
  var r = (hash & 0xFF0000) >> 16;
  var g = (hash & 0x00FF00) >> 8;
  var b = hash & 0x0000FF;
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}

console.log(calendars)

calendars.forEach((x)=>{
  x.bgColor = hashStringToColor(x.name); 
  x.dragBgColor = x.borderColor = x.bgColor })

export default function Dashboard() {
    let myUsername;
    if (!window.localStorage.getItem("isLoggedIn") || !window.localStorage.getItem("username")){
        window.location.href = "/";
        return;
    } else {
        myUsername = window.localStorage.getItem("username")
    }

    // const handleSubmit =  async (e) => {

    //     e.preventDefault()
    //     const form = new FormData(e.currentTarget);
  
    //     let url = "xxxxx"
    //     let data = JSON.stringify({
    //         "username": form.get("username"), 
    //         "password": form.get("password")})
  
    //     fetch(url, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': "application/json; charset=utf-8"},
    //       body: data,
    //     })
    //     .then((response) => {
    //       if (response.ok){
    //         swal.fire({
    //           title: "Login exitoso", //directamente redireccionar
    //           icon: "success"});
    //         updateDashboard();
    //       } else {
    //         console.log(response)
    //         swal.fire({
    //           title: "Ocurrió un error: ",
    //           text: response.statusText,
    //           icon: "error"});
    //       }})
    //     .catch((error) => {console.log(error); swal.fire({
    //       title: "Ocurrió un error: ",
    //       text: error.message,
    //       icon: "error"});});
        
    //     //setModalOpen(false);
          
    //   }

      return (
        <div style={{display: "flex", width: "100%"}}>

        <div style={{flexDirection: "column", flex: "none", width: "256px", overflow: "hidden", position: "relative"}} ><Sidebar username={myUsername}></Sidebar></div>
            

        <div style={{flex: "1 1 auto", overflow: "hidden", position: "relative"}}><TuiCalendar schedules={schedules} calendars={calendars}/></div>    
           

        </div>
      );
}
