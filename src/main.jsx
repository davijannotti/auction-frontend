import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from './themes/MainTheme.js';
import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import Auctions from "./pages/Auctions.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter> {/* O Router envolve tudo */}
        <Routes>
          {/* O App vira a rota pai */}
          <Route element={<App />}> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auctions" element={<Auctions />} />
            {/* Rota padrão para caso a URL esteja vazia */}
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
