import React, { useState } from "react";
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
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";

export default function Navbar({ onMenuClick }) {
  const [filter, setFilter] = useState("todos");

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#fff",
        color: "#333",
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
            bgcolor: "#f5f5f5",
            boxShadow: "none",
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
            <MenuItem value="todos">Tudo</MenuItem>
            <MenuItem value="cod">Cód.</MenuItem>
            <MenuItem value="nome">Nome</MenuItem>
          </Select>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="O que você procura?"
          />

          <IconButton sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Paper>

        <Box sx={{ width: 48, display: { xs: "none", sm: "block" } }} />
      </Toolbar>
    </AppBar>
  );
}
