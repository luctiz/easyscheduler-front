
import swal from "sweetalert2";

export function fireModalCrearEvento(username, clicked_date, current_date,updateFunction, hardcoded_list = null){
  fetch(`${process.env.REACT_APP_BACKEND_URL}/usuario/${username}`, {method: 'GET'}
  ).then((response) => {
  response.json().then(data => {

swal.fire({
  title: 'Crear evento',
  focusConfirm: true,
  html:
  
    `<h4 class="swal-content" style="margin-bottom:2px"> Equipo </h4>
    <select id="nombreEquipo" style="margin-top:2px" class="swal2-input" name="select">
    `

    + (hardcoded_list ? hardcoded_list.map((x) => `<option value="${x}">${x}</option>`).reduce((x,y) => x+y)
      : data.equipos.map((x) => x.nombre).map((x) => `<option value="${x}">${x}</option>`).reduce((x,y) => x+y)) + 
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
    
    let el = document.activeElement;
    if (!el) return;
    el.removeAttribute("tabIndex")
    el.classList.add("js-swal-fixed") 
  },
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
      fetch(`${process.env.REACT_APP_BACKEND_URL}/evento/${result.value.nombreEvento}&${result.value.fechaEvento}&${result.value.nombreEquipo}&${username}`, {
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
})
  })
}


export function fireModalDuplicarEvento(username, nombreFecha,current_date,updateFunction){
  fetch(`${process.env.REACT_APP_BACKEND_URL}/usuario/${username}`, {method: 'GET'}
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
        fetch(`${process.env.REACT_APP_BACKEND_URL}/duplicarEvento/duplicar/${nombreFecha}&${username}&${result.value.nombreEquipo}&${result.value.fechaEvento}`, {
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
        fetch(`${process.env.REACT_APP_BACKEND_URL}/tarea/${nombreFechaEvento}&${v.nombre}&${v.descripcion}&${v.horaInicio}&${v.horaFin}&${username}&${v.peso}`, {
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
      + miembrosList.map((x) => (x === defaultvalue?`<option value="${x}" selected>${x}</option>`:`<option value="${x}">${x}</option>`)).reduce((x, y) => x+y),
    
      showCancelButton: true,
      cancelButtonColor: 'grey',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Asignar',
      didOpen: () => { 
    
        let el = document.activeElement;
        if (!el) return;
        el.removeAttribute("tabIndex")
        el.classList.add("js-swal-fixed") 
      },
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
          fetch(`${process.env.REACT_APP_BACKEND_URL}/tarea/modificarAsignado/${nombreFechaEvento}&${nombreTarea}&${v.miembro}`, {
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