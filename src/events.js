
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