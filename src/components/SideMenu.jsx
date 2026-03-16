import { useLocation, Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import GavelIcon from "@mui/icons-material/Gavel";
import BallotIcon from "@mui/icons-material/Ballot";
import SettingsIcon from "@mui/icons-material/Settings";

export default function SideMenu() {
  const location = useLocation();

  return (
    <Box
      sx={{
        pt: 2,
        width: 240,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar />

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {[
            { text: "Dashboard", icon: <HomeIcon />, path: "/dashboard" },
            { text: "Auctions", icon: <GavelIcon />, path: "/auctions" },
            { text: "Itens", icon: <BallotIcon />, path: "/items" },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{ gap: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link} 
            to="/settings" 
            selected={location.pathname === "/settings"} 
            sx={{ gap: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 2,
          alignItems: "center",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.05)",
            cursor: "pointer",
          },
        }}
      >
        <Avatar alt="Amamentador" src="" sx={{ width: 36, height: 36 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
            Amamentador
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={{ color: "text.secondary", display: "block" }}
          >
            amamentador@email.com
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
