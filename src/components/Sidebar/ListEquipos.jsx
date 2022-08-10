import GroupsIcon from '@mui/icons-material/Groups';
import { ExpandLess, ExpandMore} from "@mui/icons-material";
import { useState } from "react";
import { List, ListItem, Collapse, ListItemButton, ListItemIcon, ListItemText, CircularProgress} from "@mui/material";
import ModalEquipo from './ModalEquipo';
import ModalCrearEquipo from './ModalCrearEquipo';
import { hashStringToColor } from '../../utils';


export default function ListEquipos({username, equipos, updateEquipos,updateTareas}){
    const [openCollapse, setOpenCollapse] = useState(true)

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
                    {equipos.map((equipo) => <ModalEquipo  username={username} key={equipo} equipo={equipo} updateTareas={updateTareas} updateDashboard={updateEquipos}/>
                    )}

                <ModalCrearEquipo username={username} updateListEquipos={updateEquipos} />
                </List>
            </Collapse>
            : <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></div>}

            </List>
    )
}