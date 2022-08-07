
import React, { useState, useRef, useEffect } from 'react';
import swal from 'sweetalert2';

import {Container, Stack, TextField, Button, Typography, CircularProgress} from '@mui/material';
import AppHeaderBig from '../components/AppHeaderBig';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';
import { hashStringToColor } from '../utils';



const start = new Date();
// const schedules = [
//   {
//     calendarId: "1",
//     category: "time",
//     isVisible: true,
//     title: "Study",
//     id: "1",
//     body: "Test",
//     start,
//     end: new Date(new Date().setMinutes(start.getMinutes() + 30))
//   },
//   {
//     calendarId: "2",
//     category: "time",
//     isVisible: true,
//     title: "Meeting",
//     id: "2",
//     body: "Description",
//     start: new Date(new Date().setHours(start.getHours() + 1)),
//     end: new Date(new Date().setHours(start.getHours() + 2))
//   },
//   {
//     calendarId: "3",
//     category: "time",
//     isVisible: true,
//     title: "Nombre Tarea",
//     id: "3",
//     body: "Nombre Evento",
//     start: new Date(new Date().setHours(start.getHours() -4)),
//     end: new Date(new Date().setHours(start.getHours() - 2))
//   }
// ];

const schedules = [
  {
      "calendarId": "carlos_Privado",
      "category": "time",
      "isVisible": true,
      "title": "pepepepepepe",
      "id": "{\"timestamp\":1659712902,\"date\":\"2022-08-05T15:21:42.000+00:00\"}",
      "body": "no se",
      "start": new Date("2022-08-05T15:21:00.000Z"),
      "end": new Date("2022-08-05T16:21:00.000Z")
  },
  {
      "calendarId": "carlos_Privado",
      "category": "time",
      "isVisible": true,
      "title": "nueva tarea",
      "id": "{\"timestamp\":1659834178,\"date\":\"2022-08-07T01:02:58.000+00:00\"}",
      "body": "otra tarea",
      "start": new Date("2022-08-06T02:02:00.000Z"),
      "end": new Date("2022-08-06T02:02:00.000Z")
  },
  {
      "calendarId": "carlos_Privado",
      "category": "time",
      "isVisible": true,
      "title": "nueva tarea",
      "id": "{\"timestamp\":1659834210,\"date\":\"2022-08-07T01:03:30.000+00:00\"}",
      "body": "otra tarea",
      "start": new Date("2022-08-07T04:03:00.000Z"),
      "end": new Date("2022-08-07T06:03:00.000Z")
  },
  {
      "calendarId": "carlos_Privado",
      "category": "time",
      "isVisible": true,
      "title": "pepepepe",
      "id": "{\"timestamp\":1659834238,\"date\":\"2022-08-07T01:03:58.000+00:00\"}",
      "body": "nada",
      "start": new Date("2022-08-08T01:03:00.000Z"),
      "end": new Date("2022-08-08T02:03:00.000Z")
  },
  {
      "calendarId": "equipazo3",
      "category": "time",
      "isVisible": true,
      "title": "tarea",
      "id": "{\"timestamp\":1659744618,\"date\":\"2022-08-06T00:10:18.000+00:00\"}",
      "body": "tarea",
      "start": new Date("2022-08-06T00:10:00.000Z"),
      "end": new Date("2022-08-06T01:10:00.000Z")
  },
  {
      "calendarId": "equipazo3",
      "category": "time",
      "isVisible": true,
      "title": "tarea",
      "id": "{\"timestamp\":1659744626,\"date\":\"2022-08-06T00:10:26.000+00:00\"}",
      "body": "tarea",
      "start": new Date("2022-08-06T00:10:00.000Z"),
      "end": new Date("2022-08-06T01:10:00.000Z")
  },
  {
      "calendarId": "equipazo3",
      "category": "time",
      "isVisible": true,
      "title": "otra tarea",
      "id": "{\"timestamp\":1659744711,\"date\":\"2022-08-06T00:11:51.000+00:00\"}",
      "body": "tarearearae",
      "start": new Date("2022-08-06T00:11:00.000Z"),
      "end": new Date("2022-08-06T01:11:00.000Z")
  },
  {
      "calendarId": "equipazo3",
      "category": "time",
      "isVisible": true,
      "title": "otra tarea mas",
      "id": "{\"timestamp\":1659744724,\"date\":\"2022-08-06T00:12:04.000+00:00\"}",
      "body": "tararara",
      "start": new Date("2022-08-06T00:11:00.000Z"),
      "end": new Date("2022-08-06T01:11:00.000Z")
  },
  {
      "calendarId": "equipo5",
      "category": "time",
      "isVisible": true,
      "title": "tarea eventix",
      "id": "{\"timestamp\":1659884614,\"date\":\"2022-08-07T15:03:34.000+00:00\"}",
      "body": "tarea eventix",
      "start": new Date("2022-08-06T18:03:00.000Z"),
      "end": new Date("2022-08-06T19:03:00.000Z")
  }
]

// const colorsData = [
//   {
//       "id": "carlos_Privado",
//       "name": "carlos_Privado",
//       "color": "#FFFFFF",
//       "bgColor": "#b90d5d",
//       "borderColor": "#b90d5d"
//   },
//   {
//       "id": "EquipoDeCarlos",
//       "name": "EquipoDeCarlos",
//       "color": "#FFFFFF",
//       "bgColor": "#1902a2",
//       "borderColor": "#1902a2"
//   },
//   {
//       "id": "EquipoDeCarlos2",
//       "name": "EquipoDeCarlos2",
//       "color": "#FFFFFF",
//       "bgColor": "#39b60c",
//       "borderColor": "#39b60c"
//   },
//   {
//       "id": "equipazo3",
//       "name": "equipazo3",
//       "color": "#FFFFFF",
//       "bgColor": "#d88423",
//       "borderColor": "#d88423"
//   },
//   {
//       "id": "equipazo4",
//       "name": "equipazo4",
//       "color": "#FFFFFF",
//       "bgColor": "#d88424",
//       "borderColor": "#d88424"
//   },
//   {
//       "id": "superEquipo",
//       "name": "superEquipo",
//       "color": "#FFFFFF",
//       "bgColor": "#f7bd44",
//       "borderColor": "#f7bd44"
//   },
//   {
//       "id": "equipo5",
//       "name": "equipo5",
//       "color": "#FFFFFF",
//       "bgColor": "#c81b4d",
//       "borderColor": "#c81b4d"
//   },
//   {
//       "id": "otroequipo",
//       "name": "otroequipo",
//       "color": "#FFFFFF",
//       "bgColor": "#4ef91e",
//       "borderColor": "#4ef91e"
//   },
//   {
//       "id": "otroequipo4",
//       "name": "otroequipo4",
//       "color": "#FFFFFF",
//       "bgColor": "#175af8",
//       "borderColor": "#175af8"
//   },
//   {
//       "id": "nuevoequipo",
//       "name": "nuevoequipo",
//       "color": "#FFFFFF",
//       "bgColor": "#eed903",
//       "borderColor": "#eed903"
//   },
//   {
//       "id": "equipaszo",
//       "name": "equipaszo",
//       "color": "#FFFFFF",
//       "bgColor": "#d86813",
//       "borderColor": "#d86813"
//   },
//   {
//       "id": "otromas",
//       "name": "otromas",
//       "color": "#FFFFFF",
//       "bgColor": "#240195",
//       "borderColor": "#240195"
//   }
// ]

export default function Dashboard() {
    let username;
    if (!window.localStorage.getItem("isLoggedIn") || !window.localStorage.getItem("username")){
        window.location.href = "/";
        return;
    } else {
        username = window.localStorage.getItem("username")
    }

    const [equipos, setEquipos] = useState(null)

    const [calendarData, setCalendarData] = useState(null)

    const [updateCal,setUpdateCal] = useState(null)
    const [finalUpdate,setFinalUpdate] = useState(true)

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

          if (!calendarData){
          let auxCalendarsData = {}
          auxCalendarsData["equiposColorsData"] = equipos.map((a,i) => {return {id: a, name: a, color: "#FFFFFF", bgColor: hashStringToColor(a), borderColor: hashStringToColor(a)}})
          auxCalendarsData["tareas"] = []
          equipos.forEach((equipo)=>{
            let url = `http://localhost:8080/evento/equipo/${equipo}`

              fetch(url, {
                method: 'GET'
              })
              .then((response) => {
                response.json().then(data => {
                //console.log(data)

                if (response.ok){
                  data.forEach((evento) =>{
                    evento.tareas.forEach((tarea)=>{
                      auxCalendarsData["tareas"].push({
                        calendarId: equipo,
                        category: "time",
                        isVisible: true,
                        title: tarea.nombre,
                        id: String(auxCalendarsData.tareas.length),//JSON.stringify(tarea._id),
                        body: tarea.descripcion,
                        start: new Date(evento.fecha+":"+tarea.horaInicio),
                        end: new Date(evento.fecha+":"+tarea.horaFin)/* ,
                        status: tarea.estado,
                        weight: tarea.peso */
                      })
                    })

                  })

                } else {
                  console.log("Error al cargar tareas: " + data.message)
                }
              })
              })
              .catch((error) => {console.log(error); 
                console.log("Error al cargar tareas: " + error.message)}) 
          })
          // console.log("comparison")
          // console.log(auxCalendarsData.tareas, schedules)
          setCalendarData(auxCalendarsData)
          }
        }
      // console.log("equipos y calendarData:")
      // console.log(equipos)
      // console.log(calendarData)
      // console.log("Iteracion return calendar, se dibuja?:" + ((equipos && calendarData)!=null))

      // useEffect(() => {
      //   console.log(updateCal)
      //   if (updateCal){
      //     updateCal()
      //   }
      // })

      if (updateCal && equipos && finalUpdate){
        updateCal();
        setUpdateCal(null)
        setEquipos(null)
        setFinalUpdate(false)
      }

      return (
        <div style={{display: "flex", width: "100%"}}>

        <div style={{flexDirection: "column", flex: "none", width: "256px", overflow: "hidden", position: "relative"}} ><Sidebar username={username} equipos={equipos} updateEquipos={updateEquipos}></Sidebar></div>
            

        <div style={{flex: "1 1 auto", overflow: "hidden", position: "relative"}}>
          
        {(equipos && calendarData) ? <Calendar schedules={calendarData.tareas}
              equiposColorsData={calendarData.equiposColorsData}
              updateEquipos={updateEquipos}
              //cal={cal}
              updateCal={updateCal}
              setUpdateCal={setUpdateCal}
              username={username}/>
              : <CircularProgress/>}
            
          
                                                                                            
        </div>    
           

        </div>  
      );
}
