import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
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
import LogoutIcon from "@mui/icons-material/Logout";
import { client } from "../api/client.gen";

export default function SideMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  // Decodifica o payload do JWT para pegar username e email
  const getUser = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  };

  const user = getUser();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    client.setConfig({
      baseUrl: "http://localhost:8000",
      headers: { Authorization: "" },
    });
    window.location.reload();
  };

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
          ].map((item) => (
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

        {user && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ gap: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Divider />

      {user ? (
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
          <Avatar alt={user.username} src="" sx={{ width: 36, height: 36 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
              {user.username}
            </Typography>
            <Typography
              variant="caption"
              noWrap
              sx={{ color: "text.secondary", display: "block" }}
            >
              {user.email}
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Box>
      )}
    </Box>
  );
}