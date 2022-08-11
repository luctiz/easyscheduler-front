
import React, { useState} from 'react';
import swal from 'sweetalert2';

import {CircularProgress} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';
import { hashStringToColor } from '../utils';

export default function Dashboard() {
  console.log(process.env.REACT_APP_BACKEND_URL)
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
    const [finalUpdate,setFinalUpdate] = useState(3)

    const updateEquipos = () => {setEquipos(null)};


    const updateTareas = () => {
      //updateEquipos();
      setFinalUpdate(3);
      setCalendarData(null);
    }


    if (!equipos){
        let url = `${process.env.REACT_APP_BACKEND_URL}/usuario/${username}`
  
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
          auxCalendarsData["equiposColorsData"] = equipos.map((a) => {return {id: a, name: a, color: "#FFFFFF", bgColor: hashStringToColor(a), borderColor: hashStringToColor(a)}})
          auxCalendarsData["tareas"] = []
          equipos.forEach((equipo)=>{
            let url = `${process.env.REACT_APP_BACKEND_URL}/evento/equipo/${equipo}`
            console.log(url)

              fetch(url, {
                method: 'GET'
              })
              .then((response) => {
                response.json().then(data => {
                console.log(data)

                if (response.ok){ //nombreEvento, fechaEvento, nombreFechaEvento, peso, estado
                  data.forEach((evento) =>{
                    auxCalendarsData["tareas"].push({
                      calendarId: equipo,
                      category: "allday",
                      isVisible: TrustedScript,
                      title: evento.nombre,
                      id: evento.nombreFecha,
                      body: '',
                      start: new Date(evento.fecha+":00:00"),
                      end: new Date(evento.fecha+":23:59")


                    })
                    evento.tareas.filter((tarea) => (tarea.asignado === username)).forEach((tarea)=>{
                      auxCalendarsData["tareas"].push({
                        calendarId: equipo,
                        category: "time",
                        isVisible: true,
                        title: tarea.nombre,
                        id: JSON.stringify(tarea._id),
                        body: tarea.descripcion,
                        start: new Date(evento.fecha+":"+tarea.horaInicio),
                        end: new Date(evento.fecha+":"+tarea.horaFin) ,
                        raw: {
                          estado: tarea.estado,
                          peso: tarea.peso,
                          nombreEvento: evento.nombre,
                          fechaEvento: evento.fecha,
                          nombreFechaEvento: evento.nombreFecha
                        }
                        
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

      if (updateCal && equipos && (finalUpdate > 0)){
        console.log(updateCal)
        updateCal();
        setUpdateCal(null)
        setEquipos(null)
        setFinalUpdate(finalUpdate - 1)
        
      }

      return (
        <div style={{display: "flex", width: "100%"}}>

        <div style={{flexDirection: "column", flex: "none", width: "256px", overflow: "hidden", position: "relative"}} >
          <Sidebar username={username} equipos={equipos} updateEquipos={updateEquipos} updateTareas={updateTareas}/>
          </div>
            

        <div style={{flex: "1 1 auto", overflow: "hidden", position: "relative"}}>
          
        {(equipos && calendarData) ? <Calendar schedules={calendarData.tareas}
              equiposColorsData={calendarData.equiposColorsData}
              updateEquipos={updateTareas}
              //cal={cal}
              updateCal={updateCal}
              setUpdateCal={setUpdateCal}
              username={username}/>
              : <CircularProgress/>}
            
          
                                                                                            
        </div>    
           

        </div>  
      );
}
