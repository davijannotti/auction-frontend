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
  Popover,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export default function Navbar({ onMenuClick }) {
  const [filter, setFilter] = useState("todos");

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleCalendarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setAnchorEl(null);
  };

  const openCalendar = Boolean(anchorEl);

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
        <Box>
          <IconButton color="inherit" onClick={handleCalendarClick}>
            <CalendarIcon />
          </IconButton>

          <Popover
            open={openCalendar}
            anchorEl={anchorEl}
            onClose={handleCalendarClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ p: 2 }}>
              <DateCalendar
                value={selectedDate}
                onChange={(newDate) => {
                  setSelectedDate(newDate);
                  console.log("Selected Date:", newDate.format("DD/MM/YYYY"));
                  handleCalendarClose();
                }}
              />
            </Box>
          </Popover>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
