import GroupsIcon from '@mui/icons-material/Groups';
import { Add, ArrowDropDownOutlined, Drafts, ExpandLess, ExpandMore, Inbox, Logout} from "@mui/icons-material";
import { useState } from "react";
import { List, ListItem, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText, CircularProgress} from "@mui/material";
import ModalEquipo from './ModalEquipo';


export default function ListEquipos({username}){
    const [openCollapse, setOpenCollapse] = useState(true)

    const [equipos, setEquipos] = useState(null)


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
    }

    return (
        <List>

            <ListItem disablePadding>
                <ListItemButton onClick={()=>{setOpenCollapse((prev) => (!prev))}}>
                <ListItemIcon>
                    <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Equipos" />
                {openCollapse ? <ExpandLess /> : <ExpandMore />} 
                </ListItemButton>
            </ListItem> 

            {equipos ? 
            <Collapse in={openCollapse} timeout="auto" unmountOnExit> 
                <List sx={{ ml: 2, pl: 2 }} component="div" disablePadding>
                    {equipos.map((equipo) => <ModalEquipo username={username} equipo={equipo}></ModalEquipo>
                    )}
{/*                 
                <ListItemButton>
                    <ListItemIcon>
                     <GroupIcon></GroupIcon>
                    </ListItemIcon>
                    <ListItemText primary="Equipo 2" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                     <GroupIcon></GroupIcon>
                    </ListItemIcon>
                    <ListItemText primary="Equipo 3" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                     <GroupIcon></GroupIcon>
                    </ListItemIcon>
                    <ListItemText primary="Equipo 4" />
                </ListItemButton> */}

                <ListItemButton  onClick={(e) => {e.stopPropagation()}}>
                    <ListItemIcon>
                    <Add />
                    </ListItemIcon>
                    <ListItemText primary="Nuevo" />

                </ListItemButton>
                </List>
            </Collapse>
            : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></div>}

            </List>
    )
}