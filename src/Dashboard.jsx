import { useState } from "react";
import { styled } from "@mui/material/styles";
import SideMenu from "./components/SideMenu";
import Button from "@mui/material/Button";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: "none", md: "block" },
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "background.paper",
          },
        }}
      >
        <SideMenu />
      </Drawer>
    </>
  );
}
