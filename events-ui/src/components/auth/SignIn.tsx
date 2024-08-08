import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.scss";
import { loginUser } from "../../services/apiService";
import { AxiosResponse } from "axios";
import { LoginPayload } from "./AuthInterface";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const request: LoginPayload = { email, password };
    await loginUser(request)
      .then((res: AxiosResponse) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box className="auth-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit} className="auth-form">
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="auth-button"
        >
          Sign In
        </Button>
      </form>
      <Typography variant="body2" className="auth-link">
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
