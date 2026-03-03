import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import MuiDrawer from "@mui/material/Drawer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { drawerClasses } from "@mui/material/Drawer";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex" }}>
        <Navbar onMenuClick={handleToggleDrawer} />

        <Drawer open={open} onClose={handleToggleDrawer} variant="persistent">
          <SideMenu />
        </Drawer>

        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            mt: 8, // Espaço da Navbar
            minHeight: '100vh' 
          }}
        >
          {/* O Outlet é onde o componente da rota (Home ou Auctions) será renderizado */}
          <Outlet /> 
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
