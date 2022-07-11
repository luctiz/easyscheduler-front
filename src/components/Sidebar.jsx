import { Box, Divider, List, ListItem, Collapse, IconButton , Button, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { useState } from "react";
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import { Add, ArrowDropDownOutlined, Drafts, ExpandLess, ExpandMore, Inbox, Logout} from "@mui/icons-material";

import "./Sidebar.css"

export default function Sidebar() {
    const [openCollapse, setOpenCollapse] = useState(true)
    //const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({duration: 200});

    return (
    <div style={{display: "flex", flexDirection: "column", flexGrow:1}}> 

        <Logout style={{transform: "scaleX(-1)"}} onClick={(e)=>{
            window.localStorage.removeItem("username")
            window.localStorage.removeItem("isLoggedIn")

            // en logout hay que usar .removeItem("username") y .removeItem("isLoggedIn")
            window.location.href = "/";
        }}/>

        {/* <Button variant="text" onClick={()=>{setOpenCollapse((prev) => (!prev))}}> Mis Equipos <IconButton style={{marginLeft: "5px"}} color="primary" onClick={(e) => {e.stopPropagation()}}><Add /></IconButton><ArrowDropDownOutlined /></Button> */}

        {/* <div onClick={()=>{setOpenCollapse((prev) => (!prev))}}>Mis Equipos</div> */}
        
        
        <div>chau</div>


        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
            <List>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    <Drafts />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={()=>{setOpenCollapse((prev) => (!prev))}}>
                <ListItemIcon>
                    <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Equipos" />
                {openCollapse ? <ExpandLess /> : <ExpandMore />} 
                </ListItemButton>
            </ListItem> 

            {/* */}

            <Collapse in={openCollapse} timeout="auto" unmountOnExit> 
                <List sx={{ ml: 2, pl: 2 }} component="div" disablePadding>
                <ListItemButton >
                    <ListItemIcon>
                     <GroupIcon></GroupIcon>
                    </ListItemIcon>
                    <ListItemText primary="Equipo 1" />
                </ListItemButton>
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
                </ListItemButton>

                <ListItemButton  onClick={(e) => {e.stopPropagation()}}>
                    <ListItemIcon>
                    <Add />
                    </ListItemIcon>
                    <ListItemText primary="Nuevo" />

                </ListItemButton>
                </List>
            </Collapse>

            </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
            <List>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemText primary="Trash" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Spam" />
                </ListItemButton>
            </ListItem>
            </List>
        </nav>
        </Box>
    </div>)
}