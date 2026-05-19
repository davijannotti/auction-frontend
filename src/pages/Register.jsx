import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Stack, Typography, Paper } from "@mui/material";
import { apiRegisterCreate } from "../api/index";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    birth_date: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    const { data, error } = await apiRegisterCreate({ body: formData });

    if (error) {
      const firstError = Object.values(error)[0];
      setError(Array.isArray(firstError) ? firstError[0] : firstError);
      return;
    }

    navigate("/login");
  };

  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Paper sx={{ p: 4, width: 360 }}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold">Create Account</Typography>

          {error && <Typography color="error">{error}</Typography>}

          <Stack direction="row" spacing={2}>
            <TextField
              label="First Name"
              name="first_name"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="last_name"
              fullWidth
              onChange={handleChange}
            />
          </Stack>
          <TextField
            label="Username"
            name="username"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Birth Date"
            name="birth_date"
            type="date"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            name="password2"
            type="password"
            fullWidth
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleRegister}>
            Sign Up
          </Button>
          <Typography variant="body2" textAlign="center">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "inherit" }}>
              Sign In
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}