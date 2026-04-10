import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from './themes/MainTheme.js';
import { client } from "./api/client.gen.js";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import Auctions from "./pages/Auctions.jsx"
import Login from "./pages/Login.jsx"

const token = localStorage.getItem("access_token");

client.setConfig({
  baseUrl: "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${token}`,
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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
