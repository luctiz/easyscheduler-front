import React, { useCallback, useRef , useState} from "react";

import TUICalendar from "@toast-ui/react-calendar";
// import Calendar from "tui-calendar";

import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import "../styles.css";
import "./Calendar.css";

import { fireModalCrearEvento, fireModalCrearTarea } from "../events";
import { useEffect } from "react";
import ModalTarea from "./Sidebar/ModalTarea";

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
const options = {year: 'numeric', month: 'long'};

const DAYNAMES_SPANISH = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb']


export default function Calendar({username, schedules, 
  equiposColorsData, updateEquipos,setUpdateCal}){
  const cal = useRef(null);

  const [updated, setUpdated] = useState(false);
  const [selectedView, setSelectedView] = useState("month")
  const [currentHeaderDate, setCurrentHeaderDate] = useState((new Date()).toLocaleDateString(undefined, options))

  const [stateTareaModal, setStateTareaModal] = useState({open: false, tareaData: null})


  const setOpenTareaModal = (open) => {
    setStateTareaModal((prevState) => ({
      ...prevState,
      ["open"]: open
    }))
  }

  const setTareaData = (tareaData) => {
    setStateTareaModal((prevState) => ({
      ...prevState,
      ["tareaData"]: tareaData
    }))
  }
  const [scheduleTareaModal, setScheduleTareaModal] = useState(null)


  const onClickSchedule = useCallback((e) => {
    console.log(e);


    if (e.schedule.category === "allday"){
      fireModalCrearTarea(username, e.schedule.id, updateEquipos)
    } else {

      setScheduleTareaModal(e.schedule);
      setStateTareaModal({"open": true, "tareaData": null})

  }

    //fireModalTarea(username, updateEquipos, e.schedule)
    //const el = cal.current.calendarInst.getElement(id, calendarId);
    // console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {

    let clicked_date = scheduleData.start._date.toISOString().substr(0,10);
    let current_date = new Date().toISOString().substring(0,10);
    
    fireModalCrearEvento(username, clicked_date, current_date,updateEquipos)
    

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
    let html = [];

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
      //console.log(schedule);
      return _getTimeTemplate(schedule, false);
    }
  };

  const updateCurrentHeaderDate = () => {
    (setCurrentHeaderDate(cal.current ? addDays(cal.current.getInstance().getDateRangeStart().toDate(),
              selectedView === "day" ? 0 : 6).toLocaleDateString(undefined, options) : ""))
  }
  
  useEffect(() => {

    if (cal.current && cal.current.getInstance() && (!updated)){
      
      cal.current.getInstance().clear();
      cal.current.getInstance().setCalendars(equiposColorsData)
      cal.current.getInstance().createSchedules(schedules)
      let x = () => {
        cal.current.getInstance().setCalendars(equiposColorsData)
        cal.current.getInstance().createSchedules(schedules)

      }
        setUpdateCal(function(){
          return x
       })
      setUpdated(true);
      
    }

  })


  return (
    <div >
      <ModalTarea username={username} updateCalendar={updateEquipos} schedule={scheduleTareaModal} stateModal={stateTareaModal} setOpen={setOpenTareaModal} setTareaData={setTareaData}></ModalTarea>
    <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" onClick={()=> {cal.current.getInstance().today();updateCurrentHeaderDate()}}>Hoy</button>
                <button type="button" onClick={()=> {cal.current.getInstance().prev();updateCurrentHeaderDate()}}>Anterior</button>
                <button type="button"onClick={()=> {cal.current.getInstance().next();updateCurrentHeaderDate()}}>Siguiente</button>
                </span>
            <span className="rbc-toolbar-label" >{currentHeaderDate}</span>
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
        useCreationPopup={false}//false
        useDetailPopup={false}
        template={templates}
        calendars={equiposColorsData}
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