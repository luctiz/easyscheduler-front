import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Check, CheckBoxOutlineBlank} from "@mui/icons-material";


import { IconButton , CircularProgress} from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 454,
  color:"#545454",
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: "5px",
  fontSize: "1rem",
  outline: "none",
  //boxShadow: 24,
  p: 0,
};


export default function ModalTarea({username, updateCalendar, schedule, stateModal,setTareaData, setOpen}) {

  //;
  console.log(schedule)

  const handleClose = () => {setOpen(false)};

  //const [tareaData, setTareaData] = useState(null)

  let tareaData = stateModal.tareaData;
  let open = stateModal.open;


  if (schedule && !tareaData){
    
    console.log(schedule.title, schedule.raw.nombreEvento)
    let url = `${process.env.REACT_APP_BACKEND_URL}/tarea/getTareasByNombre/${schedule.title}&${schedule.raw.nombreEvento}`
    fetch(url, {
        method: 'GET'
    }).then((response) => {
      response.json().then(data => {
        console.log(data)
        setTareaData(data.filter(x => x.nombreFecha === schedule.raw.nombreFechaEvento)[0].tareas.filter((x) => (x.nombre === schedule.title))[0])
      }).then(() => updateCalendar)
    })
  }


  const handleTaskCheckbox = async (e) =>{
    e.preventDefault()
    e.stopPropagation()

    let url = `${process.env.REACT_APP_BACKEND_URL}/tarea/modificarEstado/${schedule.raw.nombreFechaEvento}&${schedule.title}&1&${username}`
    fetch(url, {
        method: 'PUT'
    }).then((response) => {
        console.log(response)
        response.json().then(data => {
        console.log(data);
        setTareaData(null)
    })}).catch((error) => {console.log(error)})   
  }

  return (
    <div>
    {/* <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
        <Add />
        </ListItemIcon>
        <ListItemText primary="Agregar" />
    </ListItemButton> */}
     <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 50,
          color: `rgba(0,0,0,.4)`
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          {schedule ? 
          <div className="swal2-html-container" id="swal2-html-container" style={{display: "block"}}>
          <h2 className="swal-title" style={{textAlign: "left", marginBottom: "2px", borderBottom: `4px solid ${schedule.bgColor}`}}>{schedule.calendarId}</h2>
          <h3 className="swal-title" style={{textAlign: "left", marginTop: "4px", fontWeight: "lighter"}}>Evento: {schedule.raw.nombreEvento} ({schedule.raw.fechaEvento.replaceAll("-","/")})</h3>

          <h4 className="swal-title">{schedule.title}</h4>

          <span> {schedule.start._date.toLocaleString().toLowerCase()} - {schedule.end._date.toLocaleString().toLowerCase()}</span>
          <h4 className="swal-title" style={{textAlign: "left"}}>Descripción: {schedule.body}</h4>
            
          <h4 className="swal-title" style={{textAlign: "left"}}>Peso: {schedule.raw.peso}</h4>
      
          {tareaData ? 
          <div style={{ textAlign: "left", marginBottom:"30px"}}>
            <span className="swal-title" style={{fontWeight: "bold"}}>Estado: {tareaData.estado}</span>
                  {tareaData.estado === "Pendiente" ?
                          <IconButton title='Completar' onClick={handleTaskCheckbox} ><CheckBoxOutlineBlank/></IconButton>
                        : <IconButton title='La tarea se encuentra completada'><Check/></IconButton>}
                  
                  </div>
          : <CircularProgress/>
          } 

          </div> 
          : ""}
        </Box>
        </Fade>
      </Modal>
    </div>
  );
}