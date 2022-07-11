import { useState } from "react"
import TuiCalendar from "../TuiCalendar"

export default function ESCalendar(){
    const [selectedView, setSelectedView] = useState("month")

    return (
    <div >

        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button">Hoy</button>
                <button type="button">Anterior</button>
                <button type="button">Siguiente</button>
                </span>
            <span className="rbc-toolbar-label">Julio 2022</span>
            <span className="rbc-btn-group">
                <button type="button" onClick={() => setSelectedView("day")} className="">Día</button>
                <button type="button" onClick={() => setSelectedView("week")} className="">Semana</button>
                <button type="button" onClick={() => setSelectedView("month")} className="">Mes</button>
                {/* <button type="button" onClick={() => setSelectedView("agenda")} className="">Agenda</button> */}
            </span></div>

            <TuiCalendar selectedView={selectedView} ></TuiCalendar>
        </div>)
}