
import React, { useState, useRef, useEffect } from 'react';
import swal from 'sweetalert2';

import {Container, Stack, TextField, Button, Typography, CircularProgress} from '@mui/material';
import AppHeaderBig from '../components/AppHeaderBig';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';

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
    id: "3",
    body: "Nombre Evento",
    start: new Date(new Date().setHours(start.getHours() -4)),
    end: new Date(new Date().setHours(start.getHours() - 2))
  }
];



var calendars;

function djb2(str){
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash;
}

function hashStringToColor(str) {
  var hash = djb2(str);

  var rgb = [0,0,0];
   rgb[0] = (hash & 0xFF0000) >> 16;
   rgb[1] = (hash & 0x00FF00) >> 8;
   rgb[2] = hash & 0x0000FF;

  // saturate:
  var max, min;

    if (rgb[0] > rgb[1])
    {
        max = (rgb[0] > rgb[2]) ? 0 : 2
        min = (rgb[1] < rgb[2]) ? 1 : 2;
    }
    else
    {
        max = (rgb[1] > rgb[2]) ? 1 : 2;
        var notmax = 1 + max % 2;
        min = (rgb[0] < rgb[notmax]) ? 0 : notmax;
    }

    console.log(rgb[max], rgb[min])
    rgb[max] = Math.round((rgb[max] + 255)/2);
    rgb[min] = Math.round((rgb[min])/2);
    console.log(rgb[max], rgb[min])


  return "#" + ("0" + rgb[0].toString(16)).substr(-2) + ("0" + rgb[1].toString(16)).substr(-2) + ("0" + rgb[2].toString(16)).substr(-2);
}

export default function Dashboard() {
    let username;
    if (!window.localStorage.getItem("isLoggedIn") || !window.localStorage.getItem("username")){
        window.location.href = "/";
        return;
    } else {
        username = window.localStorage.getItem("username")
    }

    const [equipos, setEquipos] = useState(null)

    const updateEquipos = () => {setEquipos(null)};


    if (!equipos){
        let url = `http://localhost:8080/usuario/${username}`
  
        fetch(url, {
          method: 'GET'
        })
        .then((response) => {
          console.log(response)
          response.json().then(data => {
          console.log(data)

          if (response.ok){
            console.log(data);
            setEquipos(data.equipos.map((el) => el.nombre))

          } else {
            swal.fire({
              title: "Ocurrió un error: ",
              text: data.message,
              icon: "error"});
          }
        })
        })
        .catch((error) => {console.log(error); swal.fire({
          title: "Ocurrió un error: ",
          text: error.message,
          icon: "error"});});   
          
        } else {
          calendars = equipos.map((a,i) => {return {id: i, name: a, color: "#FFFFFF", bgColor: hashStringToColor(a), borderColor: hashStringToColor(a)}})
        }


      return (
        <div style={{display: "flex", width: "100%"}}>

        <div style={{flexDirection: "column", flex: "none", width: "256px", overflow: "hidden", position: "relative"}} ><Sidebar username={username} equipos={equipos} updateEquipos={updateEquipos}></Sidebar></div>
            

        <div style={{flex: "1 1 auto", overflow: "hidden", position: "relative"}}>
          {equipos ? 
            <Calendar schedules={schedules} 
              calendars={calendars}/>
            : <CircularProgress/>}
          
                                                                                            
        </div>    
           

        </div>
      );
}
