import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../../styles/AuthStyles.scss";
import { registerUser } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { RegisterPayload } from "./AuthInterface";
import { AxiosResponse } from "axios";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const request: RegisterPayload = { name, email, password };

    await registerUser(request)
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
        Register
      </Typography>
      <form onSubmit={handleSubmit} className="auth-form">
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={name}
          placeholder="Need minimum 3 characters"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          placeholder="Need valid email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          placeholder="Need minimum 6 characters"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="auth-button"
        >
          Register
        </Button>
      </form>
      <Typography variant="body2" className="auth-link">
        Already have an account? <Link to="/">Sign In</Link>
      </Typography>
    </Box>
  );
};

export default Register;
