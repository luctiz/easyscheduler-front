import React, { useCallback, useRef , useState} from "react";
import { render } from "react-dom";

import TUICalendar from "@toast-ui/react-calendar";
// import Calendar from "tui-calendar";
import { ISchedule, ICalendarInfo } from "tui-calendar";

import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import "../styles.css";
import "./Calendar.css";
import { CircularProgress, Modal } from "@mui/material";
import swal from "sweetalert2";

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
const options = {year: 'numeric', month: 'long'};

const DAYNAMES_SPANISH = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb']


export default function Calendar({username, schedules, calendars, updateEquipos}){
  const cal = useRef(null);
  const [selectedView, setSelectedView] = useState("month")
  const [currentHeaderDate, setCurrentHeaderDate] = useState((new Date()).toLocaleDateString(undefined, options))

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    // console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    let clicked_date = scheduleData.start._date.toISOString().substr(0,10);
    let current_date = new Date().toISOString().substring(0,10);
    swal.fire({
      title: 'Crear evento',
      focusConfirm: true,
      html:
      
        `<h4 class="swal-content" style="margin-bottom:2px"> Equipo </h4>
        <select id="nombreEquipo" style="margin-top:2px" class="swal2-input" name="select">
        <option value="..." disabled selected> ... </option>`
        + calendars.map((x) => `<option value="${x.name}">${x.name}</option>`).reduce((x,y) => x+y) + 
        `</select> <br/>
        <h4 class="swal-content" style="margin-bottom:2px">Nombre</h4>
        <input id="nombreEvento" class="swal2-input" style="margin-top:2px" type="text" placeholder="Nombre Evento..." ><br />
        <h4 class="swal-content" style="margin-bottom:2px">Fecha</h4>
        <input id="fechaEvento" style="margin-top:2px" class="swal2-input" type="date" value=${clicked_date < current_date ? current_date: clicked_date} min=${current_date} />
        <br />`,
      showCancelButton: true,
      cancelButtonColor: 'grey',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve({
            "nombreEquipo": document.getElementById("nombreEquipo").value,
            "nombreEvento": document.getElementById("nombreEvento").value,
            "fechaEvento": document.getElementById("fechaEvento").value.replace("/","-")
        })
        })
      }
    }).then(function (result) {
      console.log(result)
      if (result.isConfirmed){
          fetch(`http://localhost:8080/evento/${result.value.nombreEvento}&${result.value.fechaEvento}&${result.value.nombreEquipo}&${username}`, {
            method: 'POST'
          }).then((response) => {
            console.log(response)
            response.json().then(data => {
              console.log(data)
              if (response.ok){
                swal.fire({
                  title: "Se creo el evento exitosamente",
                  icon: "success"
                }).then(() => updateEquipos());
              } else {
                  swal.fire({
                  title: "Ocurrió un error: ",
                  text: data.message,
                  icon: "error"});
              }
              })
          })
      }
    }).then(() => document.querySelectorAll(".tui-full-calendar-month-guide-block").forEach((x) => x.remove()))
    .catch((error) => {console.log(error); swal.fire({
      title: "Ocurrió un error: ",
      text: error.message,
      icon: "error"});});   

    
    console.log(scheduleData);

    // const schedule = {
    //   id: String(Math.random()),
    //   title: scheduleData.title,
    //   isAllDay: false,
    //   start: scheduleData.start,
    //   end: scheduleData.end,
    //   category: scheduleData.isAllDay ? "allday" : "time",
    //   dueDateClass: "",
    //   location: scheduleData.location,
    //   raw: {
    //     class: scheduleData.raw["class"]
    //   },
    //   state: scheduleData.state
    // };

    // cal.current.calendarInst.createSchedules([schedule]);
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(res);

    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(e);

    const { schedule, changes } = e;

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    
    const m = ("0" + date.getMinutes()).slice(-2);

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];

    if (!isAllDay) {
      html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  const templates = {
    time: function (schedule) {
      console.log(schedule);
      return _getTimeTemplate(schedule, false);
    }
  };

  const updateCurrentHeaderDate = () => {
    (setCurrentHeaderDate(cal.current ? addDays(cal.current.getInstance().getDateRangeStart().toDate(),
              selectedView == "day" ? 0 : 6).toLocaleDateString(undefined, options) : ""))
  }

  console.log("CALENDARS:")
  console.log(calendars)
  return (
    <div >
      
    <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" onClick={()=> {cal.current.getInstance().today();updateCurrentHeaderDate()}}>Hoy</button>
                <button type="button" onClick={()=> {cal.current.getInstance().prev();updateCurrentHeaderDate()}}>Anterior</button>
                <button type="button"onClick={()=> {cal.current.getInstance().next();updateCurrentHeaderDate()}}>Siguiente</button>
                </span>
            <span className="rbc-toolbar-label">{currentHeaderDate}</span>
            <span className="rbc-btn-group">
                <button type="button" onClick={() => setSelectedView("day")} className="">Día</button>
                <button type="button" onClick={() => setSelectedView("week")} className="">Semana</button>
                <button type="button" onClick={() => setSelectedView("month")} className="">Mes</button>
                {/* <button type="button" onClick={() => setSelectedView("agenda")} className="">Agenda</button> */}
            </span></div>
      <TUICalendar
        ref={cal}
        //views={["day", "week", "month", "agenda"]}
        view= {selectedView}
        //scheduleView
        taskView={false}
        // useCreationPopup= {false}
        // useDetailPopup= {false}
        useCreationPopup={false}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        onClickSchedule={onClickSchedule}

        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
        month= {{
          daynames: DAYNAMES_SPANISH,
          startDayOfWeek: 0,
          narrowWeekend: false
        }}
        week= {{
            daynames: DAYNAMES_SPANISH,
            startDayOfWeek: 0,
            narrowWeekend: false
        }}
      />
    </div>
  );
}