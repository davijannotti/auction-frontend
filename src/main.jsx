import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from './themes/MainTheme.js';
import { client } from "./api/client.gen.js";
import { refreshAccessToken } from "./api/auth";
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import Auctions from "./pages/Auctions.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";

client.setConfig({
  baseUrl: "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

client.interceptors.response.use(async (response) => {
  if (response.status === 401) {
    await refreshAccessToken();

    // Repete a requisição original com o novo token
    const newToken = localStorage.getItem("access_token");
    const newResponse = await fetch(response.url, {
      ...response,
      headers: {
        ...response.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });

    return newResponse;
  }

  return response;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
