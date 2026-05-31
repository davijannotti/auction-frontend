import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Paper,
  Select,
  MenuItem,
  Divider,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GavelIcon from "@mui/icons-material/Gavel";
import BallotIcon from "@mui/icons-material/Ballot";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";

export default function Navbar({ onMenuClick }) {
  const [filter, setFilter] = useState("all");

  const location = useLocation();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#05070a",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 700,
            height: 50,
            backgroundColor: "#151F28",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            {[
              {
                text: "Home",
                icon: <HomeIcon sx={{ fontSize: 20 }} />,
                path: "/dashboard",
              },
              {
                text: "Dashboard",
                icon: <ShowChartIcon sx={{ fontSize: 20 }} />,
                path: "/dashboard",
              },
              {
                text: "Auctions",
                icon: <GavelIcon sx={{ fontSize: 20 }} />,
                path: "/auctions",
              },
              {
                text: "Management",
                icon: <BallotIcon sx={{ fontSize: 20 }} />,
                path: "/items",
              },
            ].map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ width: "fit-content" }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  disableRipple
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": { backgroundColor: "transparent" },
                    "&.Mui-selected": {
                      backgroundColor: "transparent",
                      borderBottom: "2px solid white",
                      borderRadius: 0,
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
                  <Typography variant="body2" sx={{ lineHeight: 1, mt: 0.5, fontWeight: "bold" }}>
                    {item.text}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            width: 300,
            height: 50,
            backgroundColor: "#151F28",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
          }}
        ></Box>
      </Toolbar>
    </AppBar>
  );
}
