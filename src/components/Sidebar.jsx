import { Box, Divider} from "@mui/material";

import "./Sidebar.css"
import ListEquipos from "./Sidebar/ListEquipos";
import UserMenu from "./UserMenu";

export default function Sidebar({username, equipos, updateEquipos,updateTareas}) {

    return (
    <div style={{display: "flex", flexDirection: "column", flexGrow:1}}> 

        <UserMenu username={username}/>

        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListEquipos username={username} equipos={equipos} updateEquipos={updateEquipos} updateTareas={updateTareas}/>
        <Divider />
        </Box>
    </div>)
}