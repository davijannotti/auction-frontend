import { useState } from "react";
import {
  AppBar,
  IconButton,
  Box,
  Popover,
} from "@mui/material";
import { CalendarMonth as CalendarIcon } from "@mui/icons-material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";       

export default function Calendar(){
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleCalendarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCalendarClose = () => {
        setAnchorEl(null);
    };

  const openCalendar = Boolean(anchorEl);
  
    return(
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
                }}
              />
            </Box>
          </Popover>
        </Box>
    );
}