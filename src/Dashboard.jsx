import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import MuiDrawer from "@mui/material/Drawer";
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
    <Box sx={{ display: "flex" }}>
      <Navbar onMenuClick={handleToggleDrawer} />

      <Drawer open={open} onClose={handleToggleDrawer} variant="persistent">
        <SideMenu />
      </Drawer>
    </Box>
  );
}
