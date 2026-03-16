import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from './themes/MainTheme.js';
import { client } from "./api/client.gen.js";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import Auctions from "./pages/Auctions.jsx"

client.setConfig({
  baseUrl: "http://localhost:8000",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzczNjg4Nzg0LCJpYXQiOjE3NzM2MDIzODQsImp0aSI6IjNhZTRkMWY5N2U1MzQwNjdiOTBlY2JjZDJiNjM3MmNkIiwidXNlcl9pZCI6IjEifQ.FdrL8WoeE8hu1_ht8XSm5zELzYDIStx5G12CwzuUxvw",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<App />}> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
