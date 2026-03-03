import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from './themes/MainTheme.js';
import Dashboard from "./App.jsx";
import Home from "./pages/Home.jsx"
import Auctions from "./pages/Auctions.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter> {/* O Router envolve tudo */}
        <Routes>
          {/* O Dashboard vira a rota pai */}
          <Route element={<Dashboard />}> 
            <Route path="/home" element={<Home />} />
            <Route path="/auctions" element={<Auctions />} />
            {/* Rota padrão para caso a URL esteja vazia */}
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
