
import swal from "sweetalert2";

export function fireModalCrearEvento(username, clicked_date, current_date, listEquiposUser,updateFunction){
swal.fire({
  title: 'Crear evento',
  focusConfirm: true,
  html:
  
    `<h4 class="swal-content" style="margin-bottom:2px"> Equipo </h4>
    <select id="nombreEquipo" style="margin-top:2px" class="swal2-input" name="select">
    `
    + listEquiposUser.map((x) => `<option value="${x}">${x}</option>`).reduce((x,y) => x+y) + 
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
  didOpen: () => { 

  let el = document.getElementsByClassName("MuiBox-root css-1wnsr1i")[0];
  if (!el) return;
  el.removeAttribute("tabIndex")
  el.classList.add("js-swal-fixed") },
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
            }).then(() => updateFunction());
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
}


export function fireModalDuplicarEvento(username, nombreFecha,current_date,updateFunction){
  fetch(`http://localhost:8080/usuario/${username}`, {method: 'GET'}
        ).then((response) => {
        response.json().then(data => {
  swal.fire({
    title: 'Duplicar evento',
    focusConfirm: true,
    html:
    
      `<h4 class="swal-content" style="margin-bottom:2px"> Equipo </h4>
      <select id="nombreEquipo" style="margin-top:2px" class="swal2-input" name="select">
      `
      + data.equipos.map((x)=> x.nombre).map((x) => `<option value="${x}">${x}</option>`).reduce((x,y) => x+y) + 
      `</select> <br/>
      <h4 class="swal-content" style="margin-bottom:2px">Fecha</h4>
      <input id="fechaEvento" style="margin-top:2px" class="swal2-input" type="date" value=${current_date} min=${current_date} />
      <br />`,
    showCancelButton: true,
    cancelButtonColor: 'grey',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Crear',
    didOpen: () => { 
  
    let el = document.getElementsByClassName("MuiBox-root css-1wnsr1i")[0];
    if (!el) return;
    el.removeAttribute("tabIndex")
    el.classList.add("js-swal-fixed") },
    preConfirm: function () {
      return new Promise(function (resolve) {
        resolve({
          "nombreEquipo": document.getElementById("nombreEquipo").value,
          "fechaEvento": document.getElementById("fechaEvento").value.replace("/","-")
      })
      })
    }
  }).then(function (result) {
    console.log(result)
    if (result.isConfirmed){
        fetch(`http://localhost:8080/duplicarEvento/duplicar/${nombreFecha}&${username}&${result.value.nombreEquipo}&${result.value.fechaEvento}`, {
          method: 'POST'
        }).then((response) => {
          console.log(response)
          response.json().then(data => {
            console.log(data)
            if (response.ok){
              swal.fire({
                title: "Se duplicó el evento exitosamente",
                icon: "success"
              }).then(() => updateFunction());
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
    })
  })
}

export function fireModalCrearTarea(username, nombreFechaEvento, updateFunction){
  swal.fire({
    title: 'Crear tarea',
    focusConfirm: true,
    html:
    
      `<h4 class="swal-content" style="margin-bottom:2px"> Nombre Tarea </h4>
      <input id="nombreTarea" class="swal2-input" style="margin-top:2px" type="text" placeholder="Nombre Tarea..." ><br />

      <h4 class="swal-content" style="margin-bottom:2px"> Descripcion </h4>
      <input id="descripcionTarea" class="swal2-input" style="margin-top:2px" type="text" placeholder="Descripcion de la tarea..." ><br />

      <h4 class="swal-content" style="margin-bottom:2px">Hora Inicio</h4>
      <input id="horaInicioTarea" style="margin-top:2px" class="swal2-input" type="time" value=${((d) => { return d.getHours() + ":" + d.getMinutes()}) (new Date())} />

      <h4 class="swal-content" style="margin-bottom:2px">Hora Fin</h4>
      <input id="horaFinTarea" style="margin-top:2px" class="swal2-input" type="time" value=${((d) => { return d.getHours() + ":" + d.getMinutes()}) (new Date(new Date(new Date().getTime() + 60*60*1000)))      } />

      <h4 class="swal-content" style="margin-bottom:2px"> Peso </h4>
      <input id="pesoTarea" class="swal2-input" style="margin-top:2px" type="number" placeholder="Peso de la tarea..." value=1 min=1><br />
      <br />`,
    showCancelButton: true,
    cancelButtonColor: 'grey',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Crear',
    didOpen: () => { 
  
    let el = document.activeElement;
    if (!el) return;
    el.removeAttribute("tabIndex")
    el.classList.add("js-swal-fixed") },
    preConfirm: function () {
      return new Promise(function (resolve) {
        resolve({
          "nombre": document.getElementById("nombreTarea").value,
          "descripcion": document.getElementById("descripcionTarea").value,
          "horaInicio": document.getElementById("horaInicioTarea").value+":00",
          "horaFin": document.getElementById("horaFinTarea").value+":00",
          "peso": document.getElementById("pesoTarea").value
      })
      })
    }
  }).then(function (result) {
    console.log(result)
    if (result.isConfirmed){
      let v = result.value;
        fetch(`http://localhost:8080/tarea/${nombreFechaEvento}&${v.nombre}&${v.descripcion}&${v.horaInicio}&${v.horaFin}&${username}&${v.peso}`, {
          method: 'PUT'
        }).then((response) => {
          console.log(response)
          response.json().then(data => {
            console.log(data)
            if (response.ok){
              swal.fire({
                title: "Se creo la tarea exitosamente",
                icon: "success"
              }).then(() => updateFunction());
            } else {
                swal.fire({
                title: "Ocurrió un error: ",
                text: data.message,
                icon: "error"});
            }
            })
        })
    }
  })
  .catch((error) => {console.log(error); swal.fire({
    title: "Ocurrió un error: ",
    text: error.message,
    icon: "error"});});   
  }


  export function fireModalAsignarTarea(defaultvalue,miembrosList, nombreFechaEvento, nombreTarea, updateFunction){
    swal.fire({
      title: 'Asignar tarea a miembro',
      focusConfirm: true,
      html:
      
      `<select id="miembroAsignar" style="margin-top:2px" class="swal2-input" name="select">
      `
      + miembrosList.map((x) => (x==defaultvalue?`<option value="${x}" selected>${x}</option>`:`<option value="${x}">${x}</option>`)).reduce((x,y) => x+y),
    
      showCancelButton: true,
      cancelButtonColor: 'grey',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Asignar',
      didOpen: () => { 
    
      let el = document.activeElement;
      if (!el) return;
      el.removeAttribute("tabIndex")
      el.classList.add("js-swal-fixed") },
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve({
            "miembro": document.getElementById("miembroAsignar").value,
        })
        })
      }
    }).then(function (result) {
      console.log(result)
      if (result.isConfirmed){
        let v = result.value;
          fetch(`http://localhost:8080/tarea/modificarAsignado/${nombreFechaEvento}&${nombreTarea}&${v.miembro}`, {
            method: 'PUT'
          }).then((response) => {
            console.log(response)
            response.json().then(data => {
              console.log(data)
              if (response.ok){
                swal.fire({
                  title: "Se asignó la tarea al miembro " + v.miembro,
                  icon: "success"
                }).then(() => updateFunction());
              } else {
                  swal.fire({
                  title: "Ocurrió un error: ",
                  text: data.message,
                  icon: "error"});
              }
              })
          })
      }
    })
    .catch((error) => {console.log(error); swal.fire({
      title: "Ocurrió un error: ",
      text: error.message,
      icon: "error"});});   
    }

    function myFunc(){
        let check = document.getElementById("tareaCheckbox");
        check.checked = true;
        check.disabled = true;
    }


    export function fireModalTarea(username, updateFunction, schedule){
      swal.fire({
        focusConfirm: true,
        html:
      //   `<div class="tui-full-calendar-popup tui-full-calendar-popup-detail">
      //   <div class="tui-full-calendar-popup-container">
      //     <div class="tui-full-calendar-popup-section tui-full-calendar-section-header">
      //       <div>
      //         <span class="tui-full-calendar-schedule-private tui-full-calendar-icon tui-full-calendar-ic-private"></span>
      //         <span class="tui-full-calendar-schedule-title">nueva tarea</span>
      //       </div>
      //       <div class="tui-full-calendar-popup-detail-date tui-full-calendar-content">2022.08.07 01:03 am - 03:03 am</div>
      //     </div>
      //     <div class="tui-full-calendar-section-detail">
              
              
              
              
      //         <div class="tui-full-calendar-popup-detail-item"><span class="tui-full-calendar-icon tui-full-calendar-calendar-dot" style="background-color: #b90d5d"></span><span class="tui-full-calendar-content">carlos_Privado</span></div>
      //         <div class="tui-full-calendar-popup-detail-item tui-full-calendar-popup-detail-item-separate"><span class="tui-full-calendar-content">otra tarea</span></div>
      //     </div>
      //     <div class="tui-full-calendar-section-button">
      //       <button class="tui-full-calendar-popup-edit"><span class="tui-full-calendar-icon tui-full-calendar-ic-edit"></span><span class="tui-full-calendar-content">Edit</span></button>
      //       <div class="tui-full-calendar-popup-vertical-line"></div>
      //       <button class="tui-full-calendar-popup-delete"><span class="tui-full-calendar-icon tui-full-calendar-ic-delete"></span><span class="tui-full-calendar-content">Delete</span></button>
      //     </div>
      //   </div>
      //   <div class="tui-full-calendar-popup-top-line" style="background-color: #b90d5d"></div>
      //   <div id="tui-full-calendar-popup-arrow" class="tui-full-calendar-popup-arrow tui-full-calendar-arrow-left">
      //     <div class="tui-full-calendar-popup-arrow-border">
      //         <div class="tui-full-calendar-popup-arrow-fill"></div>
      //     </div>
      //   </div>
      // </div>`+
          `<h2 class="swal-title" style="margin-bottom:2px;border-bottom: 4px solid ${schedule.bgColor};text-align: left;">${schedule.calendarId}</h2>
          <h3 class="swal-title" style="text-align: left;margin-top: 4px;font-weight: lighter;">Evento: ${schedule.raw.nombreEvento} (${schedule.raw.fechaEvento.replaceAll("-","/")})</h3>

          <h4 class="swal-title">${schedule.title}</h4>

          <span> ${schedule.start._date.toLocaleString('en-US', { hour: 'numeric', minute:"numeric", hour12: true }).toLowerCase()} - ${schedule.end._date.toLocaleString('en-US', { hour: 'numeric', minute:"numeric", hour12: true }).toLowerCase()}</span>
          <h4 class="swal-title" style="text-align: left">Descripción: ${schedule.body}</h4>
            
          <h4 class="swal-title" style="text-align: left">Peso: ${schedule.raw.peso}</h4>
      
          <h4 class="swal-title" style="text-align: left">Estado: ${schedule.raw.estado}</h4>
          <input type="checkbox" id="tareaCheckbox" class="swal-input" onClick=${myFunc}/>`,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: 'grey',
        cancelButtonText: 'Cerrar',
        didOpen: () => { 
      
          let el = document.activeElement;
          if (!el) return;
          el.removeAttribute("tabIndex")
          el.classList.add("js-swal-fixed") 
        },
      }).then(function (result) {
        return;
        console.log(result)
        if (result.isConfirmed){
          let v = result.value;
            fetch(`http://localhost:8080/tarea/${nombreFechaEvento}&${v.nombre}&${v.descripcion}&${v.horaInicio}&${v.horaFin}&${username}&${v.peso}`, {
              method: 'PUT'
            }).then((response) => {
              console.log(response)
              response.json().then(data => {
                console.log(data)
                if (response.ok){
                  swal.fire({
                    title: "Se creo la tarea exitosamente",
                    icon: "success"
                  }).then(() => updateFunction());
                } else {
                    swal.fire({
                    title: "Ocurrió un error: ",
                    text: data.message,
                    icon: "error"});
                }
                })
            })
        }
      })
      .catch((error) => {console.log(error); swal.fire({
        title: "Ocurrió un error: ",
        text: error.message,
        icon: "error"});});   
      }