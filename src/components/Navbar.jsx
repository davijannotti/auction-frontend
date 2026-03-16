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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import Calendar from "./Calendar";

export default function Navbar({ onMenuClick }) {
  const [filter, setFilter] = useState("all");

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#05070a",
        color: "#fff",
        boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { xs: "100%", sm: 400 },
            bgcolor: "#000000",
            borderRadius: "8px",
          }}
        >
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            variant="standard"
            disableUnderline
            sx={{ ml: 1, fontSize: "0.8rem", fontWeight: "bold" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="something">Something</MenuItem>
          </Select>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="What are you looking for?"
          />

          <IconButton sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Paper>
          <Calendar />
      </Toolbar>
    </AppBar>
  );
}
