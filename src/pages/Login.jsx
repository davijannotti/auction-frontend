import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Stack, Typography, Paper } from "@mui/material";
import { apiTokenCreate } from "../api/index";
import { client } from "../api/client.gen";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const { data, error } = await apiTokenCreate({ body: credentials });

    if (error) {
      setError("Invalid username or password.");
      return;
    }

    localStorage.setItem("access_token", data.access);

    client.setConfig({
      baseUrl: "http://localhost:8000",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${data.access}`,
      },
    });

    navigate("/dashboard");
  };

  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Paper sx={{ p: 4, width: 360 }}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold">Login</Typography>

          {error && <Typography color="error">{error}</Typography>}

          <TextField
            label="Username"
            name="username"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleLogin}>
            Sign In
          </Button>
          <Typography variant="body2" textAlign="center">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "inherit" }}>
              Sign Up
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}